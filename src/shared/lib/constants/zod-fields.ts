/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod'

export const userNameSchema = z
  .string()
  .min(2, 'The name must contain at least 2 characters')
  .max(30, 'Name cannot be longer than 30 characters')

export const userEmailSchema = z
  .string()
  .email('Enter a valid email address')
  .max(30, 'E-mail cannot be longer than 30 characters')

export const userPasswordSchema = z
  .string()
  .min(8, 'The password must contain at least 8 characters')
  .max(100, 'The password cannot be longer than 100 characters')
  .regex(/^[\w!#$%&()*+,./:;<>?@[\\\]^{}~-]+$/, {
    message:
      'The password can contain only Latin letters, numbers and special characters: !@#$%^&*()_+{}[]:;<>,.?~\\/-',
  })
