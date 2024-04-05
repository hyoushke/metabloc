import type { IMessage } from '@shared/lib/types'
import { create } from 'zustand'

type ChatStore = {
  messages: IMessage[]
  loading: boolean
  setMessages: (messages: IMessage[]) => void
  addMessages: (messages: IMessage[]) => void
  setLoading: (loading: boolean) => void
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  loading: false,
  isAuth: true,
  setIsAuth: (isAuth) => {
    set(() => ({ isAuth }))
    console.log(get()) // Log the entire state
  },
  setMessages: (newMessages) => {
    set(() => ({ messages: newMessages }))
    console.log(get()) // Log the entire state
  },
  addMessages: (newMessages) => {
    set((state) => ({ messages: [...state.messages, ...newMessages] }))
    console.log(get()) // Log the entire state
  },
  setLoading: (status) => {
    set(() => ({ loading: status }))
    console.log(get()) // Log the entire state
  },
}))
