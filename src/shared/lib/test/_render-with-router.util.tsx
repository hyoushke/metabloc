/* eslint-disable import/no-extraneous-dependencies */
import { routes } from '@app/config/router'
import { ComposeProviders } from '@app/lib'
import { render, renderHook } from '@testing-library/react'
import React from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

export const renderRouterWithProviders = ({ history }: { history: string[] }) => {
  const memoryRouter = createMemoryRouter(routes, {
    initialEntries: history,
    initialIndex: 0,
  })

  return {
    ...render(
      <ComposeProviders>
        <RouterProvider router={memoryRouter} />
      </ComposeProviders>,
    ),
  }
}

export const renderRouter = ({ history }: { history: string[] }) => {
  const memoryRouter = createMemoryRouter(routes, {
    initialEntries: history,
  })

  return {
    ...render(<RouterProvider router={memoryRouter} />),
  }
}

export function renderHookInsideRouter<T extends (initialProperties: unknown) => any>({
  history,
  hook,
}: {
  history: string[]
  hook: T
}) {
  const memoryRouter = createMemoryRouter(routes, {
    initialEntries: history,
  })

  return {
    ...renderHook<ReturnType<T>, Parameters<T>>(hook, {
      wrapper: () => <RouterProvider router={memoryRouter} />,
    }),
  }
}
