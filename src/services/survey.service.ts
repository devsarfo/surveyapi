import logger from "pino";
import dayjs from "dayjs";
import Guid from '../models/guid.model';
import { Survey } from './../models/survey.model';
import log from "../middlewares/logging.middleware";

const surveys: Survey[] = [];

export default class SurveyService {

    public static async get(data: any) : Promise<Survey[]>
    {
        return surveys;
    }

    public static async getById(id: string) : Promise<Survey | null>
    {
        try {
            const survey = surveys.find((user) => user.id === id);
            if(!survey) throw Error('Throw makes it go boom!');  
            
            return survey;

        } catch(error) {
            log.error("Survey Id: " + id + " not found");
        }

        return null;
    }

    public static async create(data: any) : Promise<Survey | null>
    {
        try {
            const survey: Survey = {
                id: Guid.generate(),
                title: data.title,
                questions: data.questions,
                createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
            };

            surveys.push(survey);
            return survey;

        } catch(error) {
            log.error(error);
        }

        return null;
    }
}
