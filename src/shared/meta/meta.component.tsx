import { Helmet } from 'react-helmet-async'

import type { IMetaProperties } from './meta.constant'
import { APP_META } from './meta.constant'

export function Meta({
  description = APP_META.description,
  meta = [],
  title,
  image = APP_META.image,
}: Partial<IMetaProperties>) {
  const pageTitle = `${title || APP_META.title}`

  return (
    <Helmet
      defaultTitle={APP_META.title}
      title={pageTitle}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: pageTitle,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ].concat(meta)}
    />
  )
}
