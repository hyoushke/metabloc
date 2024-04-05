export type TOption<T> = {
  value: T
  label: string
}

export enum ChatRoleEnum {
  user = 'user',
  bot = 'bot',
}

export type IMessage = {
  id: string
  text: string
  role: ChatRoleEnum
}

export enum SendEvents {
  SendMessage = 'userMessage',
}

export enum ReceivedEvents {
  NewMessage = 'botMessage',
  JWTException = 'jwtException',
}

export interface IReceivedTokens {
  accessToken: string
  refreshToken: string
}
