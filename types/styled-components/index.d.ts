import { Theme } from 'lib/theme'

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
