import { type FC, lazy, Suspense, type SVGAttributes, type SVGProps } from 'react'

const indicator = lazy(() => import('./library/indicator.svg'))
const send = lazy(() => import('./library/send.svg'))
const logo = lazy(() => import('./library/color-big-logo.svg'))
const botAvatar = lazy(() => import('./library/bot-avatar.svg'))
const eyeClosed = lazy(() => import('./library/eye-closed.svg'))
const eyeOpen = lazy(() => import('./library/eye-open.svg'))
const textLogo = lazy(() => import('./library/text-logo.svg'))
const botHead = lazy(() => import('./library/bot-head-think.svg'))

const ICONS_MAP = {
  indicator,
  send,
  logo,
  botAvatar,
  eyeOpen,
  eyeClosed,
  textLogo,
  botHead,
} as const

export type IconsTypes = keyof typeof ICONS_MAP

export interface IIconComponentProperties extends SVGAttributes<SVGElement> {
  name: IconsTypes
}

export const IconComponent = ({ name, ...props }: IIconComponentProperties) => {
  const Icon = ICONS_MAP[name] as FC<SVGProps<SVGSVGElement>>
  if (!Icon) return null

  return (
    <Suspense>
      <Icon role="img" {...props} />
    </Suspense>
  )
}
