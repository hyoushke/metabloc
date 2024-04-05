import { Image } from '@shared/ui/image'

export const BotAvatar = () => {
  return (
    // <div className="order-first mr-2 flex h-10 w-10 shrink-[0] items-center justify-center rounded-full bg-gray">
    //   <IconComponent className="mr-[1px]" name="botAvatar" />
    // </div>
    <Image
      alt="ava"
      src="/assets/robbot-head.png"
      loading="lazy"
      responsive
      className="max-w-10 order-first mr-2 max-h-6 shrink-[0]"
      sizes={{ lg: '2rem' }}
    />
  )
}
