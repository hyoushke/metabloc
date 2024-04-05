/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'

import { Meta } from './meta.component'
import { APP_META } from './meta.constant'

describe('Meta', () => {
  it('should render with default values properly', async () => {
    render(<Meta />, {
      wrapper: ({ children }) => <HelmetProvider>{children}</HelmetProvider>,
    })

    await waitFor(() => expect(document.title).toEqual(APP_META.title))

    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      APP_META.description,
    )

    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      APP_META.description,
    )

    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'website',
    )

    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      APP_META.image,
    )

    expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary',
    )

    expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      APP_META.title,
    )

    expect(document.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      APP_META.description,
    )
  })

  it('should render with custom values properly', async () => {
    const title = 'Custom Title'
    const description = 'Custom Description'
    const meta = [{ name: 'robots', content: 'noindex' }]
    const image = 'Custom Image URL'
    render(<Meta title={title} description={description} meta={meta} image={image} />, {
      wrapper: ({ children }) => <HelmetProvider>{children}</HelmetProvider>,
    })
    await waitFor(() => expect(document.title).toEqual(title))

    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      description,
    )

    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      description,
    )

    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'website',
    )

    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      image,
    )

    expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary',
    )

    expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      title,
    )

    expect(document.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      description,
    )
  })
})
