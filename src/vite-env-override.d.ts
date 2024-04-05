declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}

interface Window {
  hbspt: {
    forms: {
      create: Function
    }
  }
}

/// <reference types="vite/client" />
