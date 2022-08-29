import { Store } from './store';
import { Survey } from './../src/models/survey.model';
import dayjs from "dayjs";
import { Answer } from "../src/models/answer.model";
import Guid from '../src/models/guid.model';

let surveys: Survey[] = [
    {
        "id": "a50fb3c6-ab03-4c48-ab27-4473f5a4fd05",
        "title": "Colour Survey",
        "questions": [
            {
                "id": "d42813bd-2e1c-494a-90c9-8b122d06366c",
                "question": "What is your favorite colour?",
                "answers": [
                    "Blue",
                    "Green",
                    "Red",
                    "Yellow"
                ]
            }
        ],
        "createdAt": dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
];

let responses: Answer[] = [
    {
        id: Guid.generate(),
        surveyId: "a50fb3c6-ab03-4c48-ab27-4473f5a4fd05",
        answers: [
            {
                
                questionId: "d42813bd-2e1c-494a-90c9-8b122d06366c",
                answer: "Blue"
            }
        ],
        "createdAt": dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    {
        id: Guid.generate(),
        surveyId: "a50fb3c6-ab03-4c48-ab27-4473f5a4fd05",
        answers: [
            {
                
                questionId: "d42813bd-2e1c-494a-90c9-8b122d06366c",
                answer: "Blue"
            }
        ],
        "createdAt": dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    {
        id: Guid.generate(),
        surveyId: "a50fb3c6-ab03-4c48-ab27-4473f5a4fd05",
        answers: [
            {
                
                questionId: "d42813bd-2e1c-494a-90c9-8b122d06366c",
                answer: "Red"
            }
        ],
        "createdAt": dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
];

export default class SurveyStore implements Store<Survey> {
    get(id: string): Survey {
        throw new Error('Method not implemented.');
    }
    getAll(): Survey[] {
        throw new Error('Method not implemented.');
    }
    insert(data: any) {
        throw new Error('Method not implemented.');
    }
    update(data: any) {
        throw new Error('Method not implemented.');
    }
    delete(data: any) {
        throw new Error('Method not implemented.');
    }
}