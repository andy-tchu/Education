export type UserAnswersType = {
    id: number,
    test: UserAnswersTestType,
}

export type UserAnswersTestType = {
    id: number,
    name: string,
    questions: Array<UserAnswersQuestionType>,
}

export type UserAnswersQuestionType = {
    id: number,
    question: string,
    answers: Array<UserAnswerType>,
}

export type UserAnswerType = {
    id: number,
    answer: string,
    correct: boolean,
}