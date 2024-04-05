import { Avatar } from '@mui/material'
import type { IMessage } from '@shared/lib/types'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { BotAvatar } from './bot-avatar.component'

interface IMessagesList {
  messages: IMessage[]
}

export const MessagesList = (props: IMessagesList) => {
  const { messages } = props
  return messages.map((item) => (
    <motion.div
      key={item.text}
      animate={{
        scale: [0, 1],
      }}
      className={clsx(
        'flex max-w-[80%] flex-row items-end',
        item.role === 'user' && 'self-end',
      )}
    >
      <motion.article
        className={clsx(
          'rounded-2xl p-4',
          item.role === 'user'
            ? 'self-end bg-primary text-white'
            : 'bg-bot-msg-bg text-bot-msg-text',
        )}
      >
        <p className="whitespace-pre-wrap">{item.text}</p>
      </motion.article>
      {/* <Avatar
        className={clsx(
          'h-10 w-10 rounded-full',
          item.role === 'user' ? 'ml-2' : 'order-first mr-2',
        )}
      /> */}
      {item.role === 'user' ? (
        <Avatar className="ml-2 h-10 w-10 rounded-full" />
      ) : (
        <BotAvatar />
      )}
    </motion.div>
  ))
}
