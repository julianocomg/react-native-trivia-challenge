import * as React from "react"
import styled from "styled-components/native"
import { useNavigation } from "@react-navigation/native"

import { Logo } from "../components/logo"
import { Button } from "../components/button"
import { EScreen } from "./"
import { FadeInUp } from "../components/fadeInUp"
import { SoundEffectsControls } from "../components/soundEffectsControls"
import { View } from "react-native"
import { GradientBackground } from "../components/gradientBackground"
import { Selector } from "../components/selector"
import { EQuestionDifficulty } from "../contexts/quiz"
import { useQuiz } from "../hooks/useQuiz"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation()
  const quiz = useQuiz()
  const safeArea = useSafeAreaInsets()

  return (
    <Container>
      <GradientBackground />

      <ControlsContainer style={{ zIndex: 2, paddingTop: safeArea.top + 10 }}>
        <SoundEffectsControls />
      </ControlsContainer>

      <Middle delay={500}>
        <Logo animated={true} />

        <Title>Trivia{"\n"}Challenge</Title>

        <Description>
          Are you ready to answer the next{"\n"}
          <Strong>10</Strong> questions and get <Strong>5 stars</Strong>?
        </Description>
      </Middle>

      <Bottom delay={700}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Selector
            selectedOption={quiz.difficulty}
            options={[
              EQuestionDifficulty.EASY,
              EQuestionDifficulty.MEDIUM,
              EQuestionDifficulty.HARD,
            ]}
            onSelectOption={difficulty =>
              quiz.setDifficulty(difficulty as EQuestionDifficulty)
            }
          />
        </View>

        <StyledButton
          onPress={() =>
            navigation.reset({ routes: [{ name: EScreen.QUIZ }] })
          }>
          PLAY NOW
        </StyledButton>
      </Bottom>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const ControlsContainer = styled.View`
  height: 100px;
  width: 100%;
  padding: 40px 30px 0;
`

const Middle = styled(FadeInUp)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 60px;
`

const Bottom = styled(FadeInUp)`
  height: 170px;
  justify-content: flex-end;
  padding: 0 30px 30px;
`

const Title = styled.Text`
  color: ${props => props.theme.primaryTextColor};
  text-align: center;
  font-family: "Caramel";
  font-size: 90px;
  line-height: 100px;
  margin-top: 60px;
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: 1px 2px;
  text-shadow-radius: 2px;
`

const Strong = styled.Text`
  font-weight: bold;
`

const Description = styled.Text`
  font-size: 18px;
  margin: 10px 20px 0;
  line-height: 30px;
  text-align: center;
  color: ${props => props.theme.secondaryTextColor};
  text-shadow-color: rgba(0, 0, 0, 0.1);
  text-shadow-offset: 0 1px;
  text-shadow-radius: 1px;
`

const StyledButton = styled(Button)``
