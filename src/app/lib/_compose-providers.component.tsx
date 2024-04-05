import { type ReactElement } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

interface IComposeProvidersProperties {
  children?: ReactElement
}

export const ComposeProviders = (props: IComposeProvidersProperties) => {
  return (
    <HelmetProvider>
      {props.children}
      <Toaster />
    </HelmetProvider>
  )
}
