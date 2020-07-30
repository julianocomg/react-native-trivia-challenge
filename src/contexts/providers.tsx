import * as React from "react"
import { ThemeProvider } from "styled-components"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { SoundEffectsContextProvider } from "./soundEffects"
import { QuizContextProvider } from "./quiz"
import { getTheme } from "../theme"

export const AppProviders: React.FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={getTheme()}>
        <SoundEffectsContextProvider>
          <QuizContextProvider>{children}</QuizContextProvider>
        </SoundEffectsContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
