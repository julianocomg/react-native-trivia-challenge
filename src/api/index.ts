import { stringify as qs } from "query-string"
import { unescape } from "lodash"
import shortid from "shortid"
import { EQuestionDifficulty, IQuestion } from "../contexts/quiz"

const BASE_URL = "https://opentdb.com"

export default {
  async fetchQuestions({
    amount = 10,
    difficulty = EQuestionDifficulty.HARD,
  }): Promise<IQuestion[]> {
    const endpoint = `${BASE_URL}/api.php?`

    const params = qs({ amount, difficulty, type: "boolean" })

    const response = await fetch(endpoint + params)

    const body = await response.json()

    return body.results.map((question: IQuestion) => {
      question.id = shortid()
      question.question = unescape(question.question)
      return question
    })
  },
}
