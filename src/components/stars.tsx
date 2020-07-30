import * as React from "react"
import styled, { useTheme } from "styled-components/native"
import { Ionicons as Icon } from "@expo/vector-icons"

export const Stars: React.FC<{ score: number }> = ({ score }) => {
  return (
    <Container>
      <Star minimum={20} score={score} />
      <Star minimum={40} score={score} />
      <Star minimum={60} score={score} />
      <Star minimum={80} score={score} />
      <Star minimum={100} score={score} />
    </Container>
  )
}

const Star: React.FC<{ minimum: number; score: number }> = ({
  minimum,
  score,
}) => {
  const theme = useTheme()

  let iconName = "ios-star-outline"

  if (score === minimum - 10) {
    iconName = "ios-star-half"
  }

  if (score >= minimum) {
    iconName = "ios-star"
  }

  return (
    <Icon
      name={iconName}
      size={50}
      color={theme.starsColor}
      style={{ marginHorizontal: 5 }}
    />
  )
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
