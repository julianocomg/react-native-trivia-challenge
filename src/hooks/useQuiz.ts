import * as React from "react"

import {
  QuizContext,
  EQuizAction,
  EQuestionDifficulty,
  EQuestionAnswer,
} from "../contexts/quiz"
import api from "../api"

export function useQuiz(fetchQuestionsOnMount?: boolean) {
  const [
    { difficulty, loading, questions, userAnswers },
    dispatch,
  ] = React.useContext(QuizContext)

  React.useEffect(() => {
    if (fetchQuestionsOnMount) {
      fetchQuestions()
    }
  }, [])

  function setDifficulty(difficulty: EQuestionDifficulty) {
    dispatch({
      type: EQuizAction.SET_DIFFICULTY,
      difficulty,
    })
  }

  async function fetchQuestions() {
    dispatch({ type: EQuizAction.SET_LOADING, loading: true })

    const fetchedQuestions = await api.fetchQuestions({
      difficulty,
      amount: 10,
    })

    dispatch({
      type: EQuizAction.SET_QUESTIONS,
      questions: fetchedQuestions,
    })
  }

  function getQuestion(questionId: string) {
    for (const question of questions) {
      if (question.id === questionId) {
        return question
      }
    }
  }

  function answerQuestion(questionId: string, answer: EQuestionAnswer) {
    dispatch({
      type: EQuizAction.SET_USER_ANSWER,
      questionId,
      answer,
    })
  }

  function getUserAnswerForQuestion(questionId: string) {
    for (const userAnswer of userAnswers) {
      if (userAnswer.questionId === questionId) {
        return userAnswer.answer
      }
    }
  }

  function isQuestionAnswerCorrect(questionId: string) {
    const answer = getUserAnswerForQuestion(questionId)

    if (!answer) {
      return false
    }

    const question = getQuestion(questionId)

    return question?.correct_answer === answer
  }

  function getScore() {
    let number = 0

    for (const question of questions) {
      if (isQuestionAnswerCorrect(question.id)) {
        number += 1
      }
    }

    return (number / questions.length) * 100
  }

  function reset() {
    dispatch({
      type: EQuizAction.RESET,
    })
  }

  return {
    difficulty,
    setDifficulty,
    fetchQuestions,
    answerQuestion,
    getUserAnswerForQuestion,
    isQuestionAnswerCorrect,
    getScore,
    loading,
    questions,
    userAnswers,
    reset,
  }
}
