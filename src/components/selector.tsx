import * as React from "react"
import styled from "styled-components/native"
import { TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"

import { useSoundEffects, ESoundEffect } from "../hooks/useSoundEffects"

export const Selector: React.FC<ISelector> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  const sfx = useSoundEffects()

  return (
    <Container>
      {options.map(option => {
        const isSelected = option === selectedOption

        return (
          <TouchableOpacity
            key={option}
            onPressIn={() => {
              Haptics.selectionAsync()
              sfx.play(ESoundEffect.BUTTON_PRESS)
            }}
            onPress={() => onSelectOption(option)}
            style={{ flex: 1, overflow: "hidden", borderRadius: 80 }}>
            <Option isSelected={isSelected}>
              <OptionText isSelected={isSelected}>{option}</OptionText>
            </Option>
          </TouchableOpacity>
        )
      })}
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.selectorBackgroundColor};
  border-radius: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`

const Option = styled.View<{ isSelected: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50px;

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background-color: ${theme.selectorSelectedOptionBackgroundColor};
  `}
`

const OptionText = styled.Text<{ isSelected: boolean }>`
  color: ${props => props.theme.selectorOptionColor};
  font-size: 20px;
  font-family: "Chela";
  letter-spacing: 2px;
  text-transform: capitalize;

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    color: ${theme.selectorSelectedOptionColor};
  `}
`

interface ISelector {
  options: string[]
  selectedOption: string
  onSelectOption: (option: string) => void
}
