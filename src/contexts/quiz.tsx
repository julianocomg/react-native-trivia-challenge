import * as React from "react"

export enum EQuizAction {
  SET_DIFFICULTY = "SET_DIFFICULTY",
  SET_LOADING = "SET_LOADING",
  SET_QUESTIONS = "SET_QUESTIONS",
  SET_USER_ANSWER = "SET_USER_ANSWER",
  RESET = "RESET",
}

export enum EQuestionDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum EQuestionAnswer {
  TRUE = "True",
  FALSE = "False",
}

export interface IQuestion {
  id: string
  category: string
  type: string
  question: string
  difficulty: EQuestionDifficulty
  correct_answer: EQuestionAnswer
  incorrect_answers: EQuestionAnswer[]
}

const INITIAL_STATE: IQuizContextState = {
  loading: true,
  difficulty: EQuestionDifficulty.MEDIUM,
  questions: [],
  userAnswers: [],
}

const QuizReducer = (
  state: IQuizContextState,
  action: TQuizAction,
): IQuizContextState => {
  switch (action.type) {
    case EQuizAction.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.difficulty,
      }

    case EQuizAction.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      }

    case EQuizAction.SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
        loading: false,
      }

    case EQuizAction.SET_USER_ANSWER:
      const filteredAnswers = state.userAnswers.filter(
        answer => answer.questionId !== action.questionId,
      )

      return {
        ...state,
        userAnswers: filteredAnswers.concat({
          questionId: action.questionId,
          answer: action.answer,
        }),
      }

    case EQuizAction.RESET:
      return INITIAL_STATE

    default:
      return state
  }
}

export const QuizContext = React.createContext<TQuizContext>([
  INITIAL_STATE,
  () => {},
])

export const QuizContextProvider: React.FC = ({ children }) => (
  <QuizContext.Provider value={React.useReducer(QuizReducer, INITIAL_STATE)}>
    {children}
  </QuizContext.Provider>
)

interface IUserAnswer {
  questionId: string
  answer: EQuestionAnswer
}

interface IQuizContextState {
  loading: boolean
  difficulty: EQuestionDifficulty
  questions: IQuestion[]
  userAnswers: IUserAnswer[]
}

type TQuizAction =
  | {
      type: EQuizAction.SET_DIFFICULTY
      difficulty: EQuestionDifficulty
    }
  | {
      type: EQuizAction.SET_LOADING
      loading: boolean
    }
  | {
      type: EQuizAction.SET_QUESTIONS
      questions: IQuestion[]
    }
  | {
      type: EQuizAction.SET_USER_ANSWER
      questionId: IUserAnswer["questionId"]
      answer: IUserAnswer["answer"]
    }
  | {
      type: EQuizAction.RESET
    }

type TQuizContext = [IQuizContextState, React.Dispatch<TQuizAction>]
