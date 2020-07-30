import * as React from "react"
import styled, { useTheme } from "styled-components/native"
import ColorManager from "color"
import * as Haptics from "expo-haptics"
import { ViewProps, View, TouchableWithoutFeedback } from "react-native"

import { useSoundEffects, ESoundEffect } from "../hooks/useSoundEffects"

export enum EButtonType {
  PRIMARY,
  SUCCESS,
  DISCRETE,
}

const ForwardableButton: React.RefForwardingComponent<{}, IButton> = (
  { children, onPress, disabled, type = EButtonType.PRIMARY, ...props },
  ref,
) => {
  const [isActive, setIsActive] = React.useState(false)
  const theme = useTheme()
  const sfx = useSoundEffects()

  const buttonColors = {
    [EButtonType.PRIMARY]: theme.primaryButtonColor,
    [EButtonType.SUCCESS]: theme.successButtonColor,
    [EButtonType.DISCRETE]: theme.discreteButtonColor,
  }

  const textColors = {
    [EButtonType.PRIMARY]: theme.primaryButtonTextColor,
    [EButtonType.SUCCESS]: theme.successButtonTextColor,
    [EButtonType.DISCRETE]: theme.discreteButtonTextColor,
  }

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        setIsActive(true)
        Haptics.selectionAsync()
        sfx.play(ESoundEffect.BUTTON_PRESS)
      }}
      onPressOut={() => setIsActive(false)}
      onLongPress={onPress}
      onPress={onPress}
      disabled={disabled}>
      <Container
        {...props}
        ref={ref as React.RefObject<View>}
        isActive={isActive}
        disabled={disabled}
        buttonColor={buttonColors[type]}>
        {typeof children === "string" ? (
          <StyledText
            textColor={textColors[type]}
            disableShadow={type === EButtonType.DISCRETE}>
            {children}
          </StyledText>
        ) : (
          children
        )}
      </Container>
    </TouchableWithoutFeedback>
  )
}

export const Button = React.forwardRef(ForwardableButton)

const Container = styled.View<{
  disabled?: boolean
  isActive: boolean
  buttonColor: string
}>`
  width: 100%;
  height: 54px;
  border-radius: 54px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.buttonColor};
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-radius: 1px;
  shadow-opacity: 0.1;

  ${({ isActive, buttonColor }) =>
    isActive &&
    `
    background-color: ${ColorManager(buttonColor).darken(0.1)}
  `}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
  `}
`

const StyledText = styled.Text<{ textColor: string; disableShadow: boolean }>`
  font-size: 25px;
  font-family: "Chela";
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${props => props.textColor};
  text-shadow-color: rgba(0, 0, 0, 0.4);
  text-shadow-offset: 2px 2px;
  text-shadow-radius: 1px;

  ${({ disableShadow }) =>
    disableShadow &&
    `
    text-shadow-color: transparent;
  `}
`

interface IButton extends ViewProps {
  children: React.ReactNode
  onPress: () => void
  type?: EButtonType
  disabled?: boolean
}
