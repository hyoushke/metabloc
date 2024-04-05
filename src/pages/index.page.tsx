import { useChatApi, useChatStore } from '@entities/chat'
import { LocalStorageKeys } from '@shared/lib/enums'
import { Meta } from '@shared/meta'
import { IconComponent } from '@shared/ui'
import { Image } from '@shared/ui/image'
import { BotAvatar, MessagesList } from '@widgets/chat'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const dotsContainerAnimation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const dotAnimation = {
  hidden: { y: 20, opacity: 0.5 },
  visible: {
    y: [0, -5, 0],
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 0.5,
    },
  },
}

const MIN_TEXTAREA_HEIGHT: number = 64
const MAX_TEXTAREA_HEIGHT: number = 184

export const ChatPage = () => {
  const { loading, messages, isAuth } = useChatStore()
  const [message, setMessage] = useState('')
  const { sendMessage } = useChatApi()
  const navigate = useNavigate()
  const isAuth2 = true

  const scrollReference = useRef<HTMLDivElement>(null)
  const textareaReference = useRef<HTMLTextAreaElement>(null)

  function resizeTextArea() {
    if (textareaReference.current) {
      textareaReference.current.style.height = 'inherit'
      textareaReference.current.style.height = `${Math.max(
        textareaReference.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT,
      )}px`
    }
  }

  function checkAuth() {
    if (!localStorage.getItem(LocalStorageKeys.accessToken)) {
      // navigate('/auth')
      console.log('aaaa')
    }
  }

  function scrollWithDelay() {
    // console.log('messages', messages)
    setTimeout(() => {
      scrollReference.current?.scrollTo({
        top: scrollReference.current?.scrollHeight,
        behavior: 'smooth',
      })
    }, 100)
  }

  function messageSendHandler() {
    if (!message) {
      return
    }
    sendMessage(message)
    setMessage('')
  }

  function onSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    messageSendHandler()
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault()
      messageSendHandler()
    }
  }
  // useEffect(checkAuth, [])
  useEffect(scrollWithDelay, [messages])
  useLayoutEffect(resizeTextArea, [message])

  return (
    <>
      <Meta description="Digital Human" title="Digital Human" />
      <div className="mr-4 max-lg:hidden">
        <Image
          alt="robot"
          src="/assets/robot.png"
          responsive
          loading="lazy"
          sizes={{ lg: '7rem', sm: '5rem' }}
        />
      </div>
      <div className="mt-8 flex h-[80%] w-[780px] max-w-[80%] flex-col items-center self-start rounded-[20px] bg-white p-8 shadow-[0px_4px_15px_2px_#F7F8FC]">
        <div ref={scrollReference} className="non-scrollbar w-full flex-1 overflow-auto">
          <div className="flex flex-1 flex-col justify-end gap-4">
            {isAuth2 && <MessagesList messages={messages} />}
            {isAuth2 && loading && (
              <motion.div
                animate={{
                  scale: [0, 1],
                  transition: {
                    duration: 0.5,
                  },
                }}
                className={clsx('flex w-fit flex-row')}
              >
                <BotAvatar />
                <motion.article className="rounded-2xl bg-bot-msg-bg p-4 text-bot-msg-text">
                  <motion.ul
                    className="flex flex-row gap-2"
                    variants={dotsContainerAnimation}
                    initial="hidden"
                    animate="visible"
                  >
                    {[0, 1, 2].map((index) => (
                      <motion.li
                        key={index}
                        variants={dotAnimation}
                        className="h-3 w-3 rounded-full bg-primary"
                      />
                    ))}
                  </motion.ul>
                </motion.article>
              </motion.div>
            )}
          </div>
        </div>
        <motion.form
          onSubmit={onSendMessage}
          animate={{
            scaleX: [0, 1],
          }}
          className={clsx(
            'relative mt-6 w-full rounded-2xl bg-msg-input-bg',
            !isAuth2 && 'pointer-events-none select-none opacity-40',
          )}
        >
          <textarea
            ref={textareaReference}
            onKeyDown={handleKeyPress}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full resize-none bg-transparent p-5 pr-20 text-msg-input-text placeholder:text-msg-input-placeholder focus:outline-none"
            placeholder="Your message"
            rows={1}
            style={{
              maxHeight: MAX_TEXTAREA_HEIGHT,
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className={clsx(
              'absolute right-6 top-0 flex h-full items-center active:opacity-50',
              {
                'opacity-80 pointer-events-none': loading,
              },
            )}
          >
            <IconComponent name="send" className="h-10 w-10 rotate-45" />
          </button>
        </motion.form>
      </div>
    </>
  )
}
