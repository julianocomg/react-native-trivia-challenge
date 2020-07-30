import * as React from "react"
import styled from "styled-components/native"
import Carousel from "react-native-snap-carousel"

import { useQuiz } from "../hooks/useQuiz"
import { Loading } from "../components/loading"
import { ErrorMessage } from "../components/errorMessage"
import { IQuestion, EQuestionAnswer } from "../contexts/quiz"
import { Dimensions, Platform } from "react-native"
import { Button, EButtonType } from "../components/button"
import { SoundEffectsControls } from "../components/soundEffectsControls"
import { useNavigation } from "@react-navigation/native"
import { EScreen } from "."
import { GradientBackground } from "../components/gradientBackground"
import { FadeInUp } from "../components/fadeInUp"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const QuizScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const navigation = useNavigation()
  const quiz = useQuiz(true)
  const safeArea = useSafeAreaInsets()

  const isLoading = quiz.loading
  const hasError = !quiz.loading && !quiz.questions.length
  const currentQuestion = quiz.questions[currentIndex]

  function answerQuestion(answer: EQuestionAnswer) {
    quiz.answerQuestion(currentQuestion.id, answer)

    if (currentIndex === quiz.questions.length - 1) {
      return navigation.reset({ routes: [{ name: EScreen.RESULTS }] })
    }

    setCurrentIndex(currentIndex + 1)
  }

  if (isLoading) {
    return <Loading />
  }

  if (hasError) {
    return (
      <ErrorMessage
        title="Oh no!"
        message="Something went wrong when loading your questions."
        onTryAgain={() => quiz.fetchQuestions()}
      />
    )
  }

  return (
    <Container>
      <GradientBackground />

      <Header style={{ marginTop: safeArea.top + 10 }}>
        <SoundEffectsControls>
          <Difficulty>{quiz.difficulty}</Difficulty>
        </SoundEffectsControls>
      </Header>

      <Content>
        <FadeInUp delay={300} style={{ width: "100%", paddingHorizontal: 20 }}>
          <Category>{currentQuestion.category}</Category>
        </FadeInUp>

        <QuestionsCarousel
          questions={quiz.questions}
          currentIndex={currentIndex}
        />

        <FadeInUp delay={700}>
          <Index>
            {currentIndex + 1} / {quiz.questions.length}
          </Index>
        </FadeInUp>

        <Buttons delay={900}>
          <TrueButton
            type={EButtonType.DISCRETE}
            onPress={() => answerQuestion(EQuestionAnswer.TRUE)}>
            TRUE
          </TrueButton>

          <Or></Or>

          <FalseButton
            type={EButtonType.DISCRETE}
            onPress={() => answerQuestion(EQuestionAnswer.FALSE)}>
            FALSE
          </FalseButton>
        </Buttons>
      </Content>
    </Container>
  )
}

const QuestionsCarousel: React.FC<{
  questions: IQuestion[]
  currentIndex: number
}> = ({ questions, currentIndex }) => {
  const sizes = getSizes()
  const carouselRef = React.useRef<any>(null)

  React.useLayoutEffect(() => {
    setTimeout(() => carouselRef.current?.triggerRenderingHack(), 50)
  }, [])

  React.useEffect(() => {
    carouselRef.current?.snapToItem(currentIndex, true)
  }, [currentIndex])

  return (
    <FadeInUp
      delay={500}
      pointerEvents="none"
      style={{
        height: sizes.CARD_HEIGHT + 20,
      }}>
      <Carousel
        ref={carouselRef as any}
        layout="tinder"
        inverted={Platform.OS === "android"}
        sliderWidth={sizes.WINDOW_WIDTH}
        sliderHeight={sizes.CARD_HEIGHT}
        itemWidth={sizes.CARD_WIDTH}
        itemHeight={sizes.CARD_HEIGHT}
        data={questions}
        slideStyle={{
          flex: 1,
          alignItems: "center",
          paddingTop: 10,
        }}
        renderItem={({ item: question }: { item: IQuestion }) => (
          <QuestionCard question={question} />
        )}
      />
    </FadeInUp>
  )
}

export const QuestionCard: React.FC<{ question: IQuestion }> = ({
  question,
}) => {
  const sizes = getSizes()

  return (
    <QuestionCardContainer
      style={{
        width: sizes.CARD_WIDTH,
        height: sizes.CARD_HEIGHT,
      }}>
      <QuestionCardText>{question.question}</QuestionCardText>
    </QuestionCardContainer>
  )
}

function getSizes() {
  const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get(
    "window",
  )

  const CARD_WIDTH = WINDOW_WIDTH * 0.8
  const CARD_HEIGHT = CARD_WIDTH * 0.7

  return { WINDOW_WIDTH, WINDOW_HEIGHT, CARD_WIDTH, CARD_HEIGHT }
}

const Container = styled.View`
  flex: 1;
`

const Header = styled.View`
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0 30px 0;
`

const Difficulty = styled.Text`
  font-size: 24px;
  text-align: center;
  font-family: "Chela";
  color: ${props => props.theme.secondaryTextColor};
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: 1px 2px;
  text-shadow-radius: 1px;
  text-transform: capitalize;
`

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Index = styled.Text`
  font-size: 25px;
  font-family: "Chela";
  margin-top: 15px;
  color: ${props => props.theme.secondaryTextColor};
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: 1px 2px;
  text-shadow-radius: 1px;
`

const Category = styled.Text`
  font-size: 45px;
  text-align: center;
  font-family: "Chela";
  margin-bottom: 30px;
  color: ${props => props.theme.primaryTextColor};
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: 1px 2px;
  text-shadow-radius: 2px;
`

const QuestionCardContainer = styled.View`
  padding: 25px;
  background-color: ${props => props.theme.questionCardBackgroundColor};
  align-items: center;
  justify-content: center;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-radius: 3px;
  shadow-opacity: 0.1;
  border-radius: 3px;
`

const QuestionCardText = styled.Text`
  font-size: 20px;
  line-height: 34px;
  color: ${props => props.theme.questionCardTextColor};
  text-align: center;
  font-weight: 500;
`

const Buttons = styled(FadeInUp)`
  flex-direction: row;
  padding: 0 30px;
  margin-top: 60px;
  justify-content: center;
  align-items: center;
`

const TrueButton = styled(Button)`
  width: 130px;
`

const FalseButton = styled(Button)`
  width: 130px;
`

const Or = styled.Text`
  margin: 0 20px;
`
