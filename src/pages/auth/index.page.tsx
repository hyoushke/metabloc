import { Meta } from '@shared/meta'
import { IconComponent } from '@shared/ui'
import { Image } from '@shared/ui/image'
import { AuthBlock } from '@widgets/chat'

export const AuthPage = () => {
  return (
    <>
      <Meta title="Digital Human - Auth" description="Digital Human" />
      <div className="flex min-h-screen">
        <div className="flex w-1/2 flex-col items-center justify-end space-y-10 bg-primary pt-10 max-md:hidden">
          <IconComponent className="max-w-[70%]" name="textLogo" />
          <Image
            sizes={{
              lg: '20rem',
              sm: '15rem',
            }}
            src="/assets/robot.png"
            className="max-w-[60%]"
            alt="Robot"
            responsive
            // className="translate-y-36"
          />
        </div>
        <div className="flex w-1/2 items-center justify-center max-md:w-full">
          <AuthBlock />
        </div>
      </div>
    </>
  )
}
