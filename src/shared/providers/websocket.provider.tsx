import { useChatStore } from '@entities/chat/store'
import type { IMessage } from '@shared/lib/types'
import { ChatRoleEnum } from '@shared/lib/types'
import { createContext, useEffect, useMemo, useRef, useState } from 'react'

interface WebSocketContextValue {
  isReady: boolean
  socket: WebSocket | null
  isError: boolean
  initializeWebSocket: () => void
  closeWebSocket: () => void
  sendMessage: (message: string) => void // New function for sending messages
}

export const WebsocketContext = createContext<WebSocketContextValue>({
  isReady: false,
  socket: null,
  isError: false,
  initializeWebSocket: () => {},
  closeWebSocket: () => {},
  sendMessage: () => {}, // Initialize sendMessage as an empty function
})

export const WebsocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false)
  const [isError, setIsError] = useState(false)
  const { addMessages, loading, setLoading } = useChatStore()

  const ws = useRef<WebSocket | null>(null)

  const messagesListener = (event: MessageEvent) => {
    const message = event.data
    console.log(`message received ${message}`)
    const newBotMessage: IMessage = {
      id: Date.now().toString(),
      text: message,
      role: ChatRoleEnum.bot,
    }
    setLoading(false)
    addMessages([newBotMessage])
  }

  const initializeWebSocket = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // If WebSocket instance exists and it's already open, return without re-initializing
      console.log('already created and opened')
      return
    }

    ws.current = new WebSocket(
      'ws://ec2-3-27-113-87.ap-southeast-2.compute.amazonaws.com:8765',
    )

    console.log('ws initialize')
    console.log(ws.current)

    ws.current.addEventListener('open', () => {
      setIsReady(true)
      setIsError(false)
    })

    ws.current.addEventListener('close', (event) => {
      console.log('socket disconnected:', event)
      setIsReady(false)
    })

    ws.current.addEventListener('error', (error) => {
      console.log('socket error:', error)
      setIsError(true)
    })

    ws.current.addEventListener('message', messagesListener)
  }

  const closeWebSocket = () => {
    if (ws.current) {
      ws.current.close()
    }
  }

  const sendMessage = (message: string) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.log('WebSocket connection is not open')
      return
    }

    ws.current.send(message)
    console.log(`Message sent: ${message}`)
  }

  useEffect(() => {
    initializeWebSocket()

    return () => {
      closeWebSocket()
      console.log('was closed')
    }
  }, [])

  const value = useMemo(
    () => ({
      isReady,
      socket: ws.current,
      isError,
      initializeWebSocket,
      closeWebSocket,
      sendMessage, // Include sendMessage in the context value
    }),
    [isReady, ws.current, isError],
  )

  return <WebsocketContext.Provider value={value}>{children}</WebsocketContext.Provider>
}
