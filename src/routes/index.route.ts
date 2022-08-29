import { Express, Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import survey from './survey.route';

export default function (app: Express) {
  // Status
  app.get("/status", (req: Request, res: Response) => res.status(200).send({
    status: 'Ok',
    message: 'API up and running'
  }));

  // Survey
  app.use('/survey', survey);
}