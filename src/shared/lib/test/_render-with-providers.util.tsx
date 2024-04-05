/* eslint-disable import/no-extraneous-dependencies */
import 'react-router-dom'

import { ComposeProviders } from '@app/lib'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import React from 'react'

export const renderWithProviders = (ui: React.ReactElement, options?: RenderOptions) => {
  const AdditionalWrapper = options?.wrapper
  return {
    ...render(ui, {
      ...options,
      wrapper: ({ children }) => (
        <ComposeProviders>
          {AdditionalWrapper ? (
            <AdditionalWrapper>{children}</AdditionalWrapper>
          ) : (
            children
          )}
        </ComposeProviders>
      ),
    }),
  }
}
