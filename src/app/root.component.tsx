import type { ComponentType } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ComposeProviders } from './lib'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <ComposeProviders>
        <App />
      </ComposeProviders>
    </StrictMode>,
  )
}

export default render
