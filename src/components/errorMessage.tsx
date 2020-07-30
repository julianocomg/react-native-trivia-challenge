import * as React from "react"
import styled, { useTheme } from "styled-components/native"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "./button"

export const ErrorMessage: React.FC<IErrorMessage> = ({
  title,
  message,
  onTryAgain,
}) => {
  const theme = useTheme()

  return (
    <Container>
      <Ionicons name="md-sad" size={160} color={theme.primaryTextColor} />

      <Title>{title}</Title>
      <Message>{message}</Message>

      <TryAgainButton onPress={onTryAgain}>TRY AGAIN</TryAgainButton>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.screenBackgroundColor};
  padding: 0 30px;
`

const Title = styled.Text`
  font-size: 50px;
  font-family: "Chela";
  color: ${props => props.theme.primaryTextColor};
  margin-top: 5px;
`

const Message = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.secondaryTextColor};
  margin-top: 15px;
  text-align: center;
  line-height: 30px;
`

const TryAgainButton = styled(Button)`
  width: 200px;
  margin-top: 60px;
`

interface IErrorMessage {
  title: string
  message: string
  onTryAgain: () => void
}
