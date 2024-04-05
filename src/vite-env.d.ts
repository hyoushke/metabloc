/// <reference types="./vite-env-override.d.ts" />

/* eslint-disable unicorn/prevent-abbreviations */
interface IAppEnvironment {
  readonly VITE_SERVER_URL: string
  readonly VITE_APP_URL: string
}

interface ImportMetaEnv extends IAppEnvironment {
  VITE_CHAT_USER_GATEWAY: string
  VITE_CHAT_WS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module NodeJS {
  interface ProcessEnv extends IAppEnvironment {}
}
