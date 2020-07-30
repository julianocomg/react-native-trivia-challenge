import * as React from "react"
import styled from "styled-components/native"
import { Logo } from "./logo"
import { GradientBackground } from "./gradientBackground"

export const Loading: React.FC = () => {
  return (
    <Container>
      <GradientBackground />

      <Logo animation="pulse" iterationDelay={0} duration={300} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
