import { getTheme } from "./index"

type Theme = ReturnType<typeof getTheme>

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
