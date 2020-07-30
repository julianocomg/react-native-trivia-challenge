import * as React from "react"
import styled, { useTheme } from "styled-components/native"
import { Entypo as Icon } from "@expo/vector-icons"

import { useQuiz } from "../hooks/useQuiz"
import { useNavigation } from "@react-navigation/native"
import { GradientBackground } from "../components/gradientBackground"
import { Stars } from "../components/stars"
import { useSoundEffects, ESoundEffect } from "../hooks/useSoundEffects"
import { Button } from "../components/button"
import { View } from "react-native"
import { EScreen } from "."
import { FadeInUp } from "../components/fadeInUp"

export const ResultsScreen: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const sfx = useSoundEffects()
  const quiz = useQuiz()

  const score = quiz.getScore()

  React.useEffect(() => {
    sfx.pause(ESoundEffect.MUSIC)

    if (score >= 80) {
      sfx.play(ESoundEffect.WON)
    } else {
      sfx.play(ESoundEffect.LOSE)
    }
  }, [])

  function getTitle() {
    if (score < 60) {
      return "Come on"
    }

    if (score < 80) {
      return "Not bad"
    }

    if (score < 100) {
      return "Good job!"
    }

    return "Perfect!"
  }

  function getEmoji() {
    if (score < 80) {
      return "emoji-neutral"
    }

    if (score < 100) {
      return "emoji-happy"
    }

    return "emoji-flirt"
  }

  function getPhrase() {
    if (score < 60) {
      return `I know you can do better...`
    }

    if (score < 80) {
      return "But I know you can do even better!"
    }

    if (score < 100) {
      return "Almost there, almost there..."
    }

    return `Looks like we have a\nSherlock Holmes here!`
  }

  return (
    <Container>
      <GradientBackground />

      <Content>
        <View style={{ flex: 1 }} />

        <FadeInUp delay={100}>
          <Icon name={getEmoji()} size={120} color={theme.secondaryTextColor} />
        </FadeInUp>

        <FadeInUp delay={300}>
          <Title>{getTitle()}</Title>
        </FadeInUp>

        <FadeInUp delay={500}>
          <Phrase>{getPhrase()}</Phrase>
        </FadeInUp>

        <FadeInUp delay={700}>
          <Stars score={score} />
        </FadeInUp>

        <View style={{ flex: 1 }} />

        <FadeInUp delay={900} style={{ width: "100%" }}>
          <Button
            onPress={() => {
              navigation.reset({ routes: [{ name: EScreen.HOME }] })
              sfx.play(ESoundEffect.MUSIC)

              setTimeout(() => quiz.reset(), 500)
            }}>
            PLAY AGAIN
          </Button>
        </FadeInUp>
      </Content>
    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 30px;
`

const Title = styled.Text`
  font-size: 60px;
  text-align: center;
  font-family: "Chela";
  margin-bottom: 20px;
  margin-top: 20px;
  letter-spacing: 2px;
  color: ${props => props.theme.primaryTextColor};
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: 1px 2px;
  text-shadow-radius: 2px;
`

const Phrase = styled.Text`
  font-size: 25px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 40px;
  color: ${props => props.theme.secondaryTextColor};
  text-shadow-color: rgba(0, 0, 0, 0.2);
  text-shadow-offset: 1px 2px;
  text-shadow-radius: 1px;
`
