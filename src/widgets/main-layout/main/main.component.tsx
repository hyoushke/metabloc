import { WebsocketProvider } from '@shared/providers'

export interface IMainProperties extends React.ComponentProps<'main'> {}
export function Main(props: IMainProperties) {
  return (
    <main
      className="mx-auto flex h-[calc(100vh-96px)] max-w-[900px] items-end justify-between max-lg:max-w-[100%] max-lg:justify-center"
      {...props}
    >
      <WebsocketProvider>{props.children}</WebsocketProvider>
    </main>
  )
}
