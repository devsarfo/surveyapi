import { Answer } from './../models/answer.model';
import { Question } from './../models/question.model';
export default class Validation {

    public static async question(questions: Question[]) 
    {
        if(!Array.isArray(questions) || questions.length < 1)
        {
            return Promise.reject('requires 1 or more questions in array');
        }  
        else
        {
            //Validate Question Answers
            let error: string[] = [];
            questions.forEach(question => {
                if(!Array.isArray(question.answers) || question.answers.length < 2)
                error.push('Question: "'+question.question+'" requires 2 or more possible answers to choose from'); 
            });

            if(error.length) return Promise.reject(error);
        }
    }

    public static async answer(answers: Answer) 
    {
        if(!Array.isArray(answers) || answers.length < 1)
        {
            return Promise.reject('requires 1 or more answers in array');
        }  
        else
        {
            //Validate Question Answers
            let error: string[] = [];
            answers.forEach(answer => {
                if(answer.answer.length < 1) error.push('Question: "'+answer.questionId+'" requires 1 answer from possible answers'); 
            });

            if(error.length) return Promise.reject(error);
        }
    }
}