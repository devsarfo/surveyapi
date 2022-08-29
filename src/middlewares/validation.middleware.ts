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

}