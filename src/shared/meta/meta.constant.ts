import type { ReactNode } from 'react'

export interface IMetaProperties {
  description: string
  meta?: Array<{ name: string; content: string; testId?: string }>
  title: string
  image?: string
  children?: ReactNode
}

export const APP_META: IMetaProperties = {
  description: 'Digital Human',
  title: 'Digital Human',
}
