export interface Answer {
    id: string,
    surveyId: string,
    answers: [{
        questionId: string,
        answer: string,
    }],
    createdAt: string
}