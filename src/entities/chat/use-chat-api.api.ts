import { useChatStore } from '@entities/chat/store'
import { ChatRoleEnum, type IMessage } from '@shared/lib/types'
import { WebsocketContext } from '@shared/providers'
import { useContext, useEffect, useRef } from 'react'

export const useChatApi = () => {
  const { isReady, socket, initializeWebSocket, closeWebSocket } =
    useContext(WebsocketContext)
  const { addMessages, loading, setLoading, isAuth } = useChatStore()
  const isMounted = useRef(false)

  const sendMessage = (query: string) => {
    if (!socket || loading) return // Check if socket is null before using it
    setLoading(true)

    // No need to send message through the socket, just add it to the messages
    const newUserMessage: IMessage = {
      id: Date.now().toString(),
      text: query,
      role: ChatRoleEnum.user,
    }
    addMessages([newUserMessage])
    socket.send(query)
  }

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  /*
  useEffect(() => {
    if (isAuth && !isReady && isMounted.current) {
      initializeWebSocket()
    }
  }, [isAuth, isReady, initializeWebSocket])
  */

  useEffect(() => {
    if (!socket || !isReady || !isMounted.current) return

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

    // socket.addEventListener('message', messagesListener)

    return () => {
      // socket.removeEventListener('message', messagesListener)
      console.log('remove message listener')
    }
  }, [socket, isReady, setLoading, addMessages, closeWebSocket, initializeWebSocket])

  return { sendMessage }
}
