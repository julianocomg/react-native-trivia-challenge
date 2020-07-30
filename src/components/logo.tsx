import * as React from "react"
import * as Animatable from "react-native-animatable"
import styled from "styled-components/native"
import { TextProperties, Text } from "react-native"

export const Logo: React.FC<TLogoProps> = ({ size, animated, ...props }) => {
  return (
    <StyledText
      size={size}
      useNativeDriver={true}
      duration={1000}
      iterationCount="infinite"
      iterationDelay={3000}
      animation={!animated ? undefined : "swing"}
      {...(props as TextProperties)}>
      ¿?
    </StyledText>
  )
}

const StyledText = styled(Animatable.Text)<{ size?: number }>`
  color: ${props => props.theme.logoColor};
  font-size: ${props => props.size || 120}px;
  font-family: "Times";
  text-shadow-color: rgba(0, 0, 0, 0.4);
  text-shadow-offset: 2px 2px;
  text-shadow-radius: 2px;
`

type TLogoProps = Animatable.AnimatableProperties<TextProperties> & {
  size?: number
  animated?: boolean
}
