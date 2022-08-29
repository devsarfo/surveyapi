import { Survey } from './../models/survey.model';
import { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import SurveyService from '../services/survey.service';

export async function index(req: Request, res: Response) {
    const result = await SurveyService.get(req); 

    return res.send({
        status: "success",
        message: "Surveys Loaded Successfully",
        surveys: result
    });
}

export async function get(req: Request, res: Response) {
    const result = await SurveyService.getById(req.params.id); 
    
    if(result)
    {
        return res.send({
            status: "success",
            message: "Survey Loaded Successfully",
            survey: result
        });
    }
    else
    {
        return res.status(500).send({
            status: "error",
            message: "An error occured loading survey with id: " + req.params.id
        });
    }
}

export async function destroy(req: Request, res: Response) {
    const result = await SurveyService.getById(req.params.id); 
    
    if(result)
    {
        return res.send({
            status: "success",
            message: "Survey Deleted Successfully",
            survey: result
        });
    }
    else
    {
        return res.status(500).send({
            status: "error",
            message: "An error occured deleting survey with id: " + req.params.id
        });
    }
}


export async function store(req: Request, res: Response) {
    //Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", fields: errors.array() });
    }
    
    const result = await SurveyService.create(req.body); 
    if(result)
    {
        return res.status(201).send({
            status: "success",
            message: "Survey Created Successfully",
            survey: result
        });
    }
    else
    {
        return res.status(500).send({
            status: "error",
            message: "An error occured creating survey"
        });
    } 
    
}

export async function update(req: Request, res: Response) {
    //Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", fields: errors.array() });
    }
    
    const result = await SurveyService.create(req.body); 
    if(result)
    {
        return res.status(201).send({
            status: "success",
            message: "Survey Created Successfully"
        });
    }
    else
    {
        return res.status(500).send({
            status: "error",
            message: "An error occured creating survey"
        });
    } 
    
}
