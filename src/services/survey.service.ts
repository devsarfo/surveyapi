import { Result } from './../models/result.model';
import { Answer } from './../models/answer.model';
import { Question } from './../models/question.model';
import dayjs from "dayjs";
import Guid from '../models/guid.model';
import { Survey } from './../models/survey.model';

let surveys: Survey[] = [
    {
        "id": "114cbb63-84dd-437e-9f9f-add560186438",
        "title": "Survey 1",
        "questions": [
            {
                "id": "d42813bd-2e1c-494a-90c9-8b122d06366c",
                "question": "What is your favorite country?",
                "answers": [
                    "Germany",
                    "Ghana",
                    "USA"
                ]
            },
            {
                "id": "145df87c-d68a-4dff-a464-c07299ddf73a",
                "question": "What is your favorite football club?",
                "answers": [
                    "Chelsea",
                    "Manchester United"
                ]
            },
            {
                "id": "73d6b3c9-972d-48ae-bed4-3cfd74703fa9",
                "question": "Do you want to confirm answers?",
                "answers": [
                    "Yes",
                    "No",
                    "Maybe"
                ]
            }
        ],
        "createdAt": dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
];
let responses: Answer[] = [];

export default class SurveyService {
    
    public static get(data: any) : Survey[]
    {
        return surveys;
    }
    
    public static getById(id: string) : Survey | null
    {
        const survey = surveys.find((survey) => survey.id === id);
        return survey ?? null;
    }
    
    public static create(data: Survey) : Result
    {
        try {
            //Create Questions
            let questions: Question[] = []
            data.questions.forEach(question => {
                questions.push({
                    id: Guid.generate(),
                    question: question.question,
                    answers: question.answers
                });
            });
            
            const survey: Survey = {
                id: Guid.generate(),
                title: data.title,
                questions: questions,
                createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
            };
            
            surveys.push(survey);
            
            return {status: 'success', data: survey};
        } catch(error: any) {
            return {status: 'error', message: error.message};
        }
        
    }
    
    public static update(id: string, data: Survey) : Result
    {
        try {
            //Get Survey
            const survey = this.getById(id);
            if(!survey) throw new Error("Survey with id: " + id + " not found");
            
            //Update Questions
            let questions: Question[] = []
            data.questions.forEach(question => {
                questions.push({
                    id: question.id ?? Guid.generate(),
                    question: question.question,
                    answers: question.answers
                });
            });
            
            //Update Fields
            survey.title = data.title;
            survey.questions = questions;
            survey.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
            
            return {status: 'success', data: survey};

        } catch(error: any) {
            return {status: 'error', message: error.message};
        }
    }
    
    public static delete(id: string) : Result
    {
        try {
            
            //Get Survey
            const survey = this.getById(id);
            if(!survey) throw new Error("Survey with id: " + id + " not found");
            
            surveys = surveys.filter((item) => item.id !== survey.id);
            return {status: 'success'};
            
        } catch(error: any) {
            return {status: 'error', message: error.message};
        }
    }
    
    public static answer(id: string, data: Answer) : Result
    {
        try {
            //Get Survey
            const survey = this.getById(id);
            if(!survey) throw new Error("Survey with id: " + id + " not found");
            
            //Save Answers
            let answers: any = [];
            data.answers.forEach(answer => {
                
                //Verify that question exists and answer is part of options
                const question = survey!.questions.find((question) => question.id === answer.questionId);
                if(!question)
                {
                    throw new Error("Invalid Question Id: " + answer.questionId);
                } 
                if(!question.answers.includes(answer.answer.trim()))
                {
                    throw new Error("Invalid Answer: " + answer.answer + " for Question Id: " + answer.questionId);
                }
                
                answers.push({
                    questionId: answer.questionId,
                    answer: answer.answer
                });

            });

            //Save Response
            const answer: Answer = {
                id: Guid.generate(),
                surveyId: id,
                answers: answers,
                createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
            }
            
            responses.push(answer);
            
            return {status: 'success', data: answer};
        } catch(error: any) {
            return {status: 'error', message: error.message};
        }
        
    }

    public static results(id: string) : Result
    {
        try {
            //Get Survey
            const survey = this.getById(id);
            if(!survey) throw new Error("Survey with id: " + id + " not found");
            
            //Save Answers
            const answers = responses.filter((response) => response.surveyId === survey.id).map(x => x.answers).flat();
            
            //Collate Results
            let results: any[] = [];
            
            if(answers)
            {
                survey.questions.forEach(question => {
                    let result: any = [];
                    
                    question.answers.forEach(answer => {
                        const count = answers.filter((x) => x.answer == answer).length;
                        result.push({
                            [answer]: count
                        });
                    });

                    results.push({
                        question: question.question,
                        results: result
                    });

                });
            }
            
            return {status: 'success', data: results};

        } catch(error: any) {
            return {status: 'error', message: error.message};
        }
        
    }
    
}
