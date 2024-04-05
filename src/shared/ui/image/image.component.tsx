import { type ComponentProps } from 'react'

const IMAGE_BREAKPOINTS = {
  sm: 330,
  md: 768,
  lg: 1024,
} as const

type ImageBreakpoint = keyof typeof IMAGE_BREAKPOINTS

const calculateSourceSet = (source: string, format: string) => {
  const filepath = source.replace(/\.[^./]+$/, '')
  return Object.entries(IMAGE_BREAKPOINTS)
    .reduce((accumulator, [breakpoint, width]) => {
      const sourceString = `${filepath}-${breakpoint}.${format}`
      return `${accumulator} ${sourceString} ${width}w, `
    }, '')
    .slice(0, -2)
}

const calculateSizes = (sizes: Partial<Record<ImageBreakpoint | number, string>>) => {
  return Object.entries(sizes)
    .reduce((accumulator, [breakpoint, size]) => {
      const imageBreakpoint =
        IMAGE_BREAKPOINTS[breakpoint as ImageBreakpoint] ||
        (!Number.isNaN(Number(breakpoint)) && breakpoint)
      return imageBreakpoint
        ? `${accumulator}(min-width: ${imageBreakpoint}px) ${size}, `
        : accumulator
    }, '')
    .slice(0, -2)
}

export type IImageProperties<Responsive extends boolean> = Omit<
  ComponentProps<'img'>,
  'sizes'
> & {
  responsive?: Responsive
  /**
   * @example
   * {
   *  sm: '100vw',
   *  md: '50vw',
   *  lg: '33vw',
   * }
   */
  sizes?: Partial<Record<ImageBreakpoint | number, string>>
  /**
   * @default webp
   */
  format?: 'webp' | 'jpeg' | 'png' | 'avif'
  alt: string
}
/**
 * 
 * @example 
 * <Image
    alt=""
    style={{
      width: '40rem',
    }}
    sizes={{
      lg: '40rem',
      md: '30rem',
      sm: '20rem',
    }}
    responsive
    src="/assets/random/random.jpg"
    loading="lazy"
  /> 
 */
export function Image<Responsive extends boolean = true>(
  props: IImageProperties<Responsive>,
) {
  const { responsive, alt, src, sizes, format = 'webp', ...rest } = props
  const srcset = src && responsive ? calculateSourceSet(src, format) : undefined
  const imageSizes = sizes ? calculateSizes(sizes) : undefined

  if (responsive)
    return <img {...rest} src={src} srcSet={srcset} sizes={imageSizes} alt={alt} />
}
