import * as React from "react"
import styled, { useTheme } from "styled-components/native"
import { MaterialCommunityIcons as MIcon } from "@expo/vector-icons"
import { useSoundEffects } from "../hooks/useSoundEffects"
import { Button, EButtonType } from "./button"

export const SoundEffectsControls: React.FC = ({ children }) => {
  const theme = useTheme()
  const {
    isMusicMuted,
    isEffectsMuted,
    toggleMusic,
    toggleEffects,
  } = useSoundEffects()

  return (
    <Container style={{ zIndex: 10 }}>
      <StyledButton
        type={EButtonType.SUCCESS}
        isMuted={isMusicMuted}
        onPress={() => {
          toggleMusic(!isMusicMuted)
        }}>
        <MIcon
          name={isMusicMuted ? "music-off" : "music"}
          size={25}
          color={theme.successButtonTextColor}
        />
      </StyledButton>

      {children}

      <StyledButton
        type={EButtonType.SUCCESS}
        isMuted={isEffectsMuted}
        onPress={() => {
          toggleEffects(!isEffectsMuted)
        }}>
        <MIcon
          name={isEffectsMuted ? "volume-off" : "volume-high"}
          size={25}
          color={theme.successButtonTextColor}
        />
      </StyledButton>
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const StyledButton = styled(Button)<{ isMuted: boolean }>`
  width: 50px;
  height: 50px;

  ${({ isMuted }) =>
    isMuted &&
    `
    opacity: 0.7;
  `}
`
