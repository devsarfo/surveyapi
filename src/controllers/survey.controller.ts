import { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import SurveyService from '../services/survey.service';

export async function index(req: Request, res: Response) {
    const result = SurveyService.get(req); 

    return res.send({
        status: "success",
        message: "Surveys Loaded Successfully",
        surveys: result
    });
}

export async function get(req: Request, res: Response) {
    const result = SurveyService.getById(req.params.id); 
    
    if(!result)
    {
        return res.status(404).send({
            status: "error",
            message: "Survey with id: " + req.params.id + " not found"
        });
    }

    return res.send({
        status: "success",
        message: "Survey Loaded Successfully",
        survey: result
    });
}

export async function store(req: Request, res: Response) {
    //Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", fields: errors.array() });
    }
    
    const result = SurveyService.create(req.body); 
    if(result.status == 'error')
    {
        return res.status(result.message  ? 400 : 500).send({
            status: "error",
            message: result.message ?? "An error occured creating survey"
        });
    } 
    
    return res.status(201).send({
        status: "success",
        message: "Survey Created Successfully",
        survey: result
    });
}

export async function update(req: Request, res: Response) {
    //Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", fields: errors.array() });
    }
    
    
    const result = SurveyService.update(req.params.id, req.body); 
    if(result.status == 'error')
    {
        return res.status(result.message  ? 400 : 500).send({
            status: "error",
            message: result.message ?? "An error occured updating survey with id: " + req.params.id
        });
    }
    
    return res.status(201).send({
        status: "success",
        message: "Survey Updated Successfully",
        survey: result.data
    });
}

export async function destroy(req: Request, res: Response) {
    const result = SurveyService.delete(req.params.id); 
    if(result.status == 'error')
    {
        return res.status(result.message  ? 400 : 500).send({
            status: "error",
            message: result.message ?? "An error occured deleting survey with id: " + req.params.id
        });
    }
    
    return res.send({
        status: "success",
        message: "Survey Deleted Successfully"
    });
}


export async function answer(req: Request, res: Response) {
    //Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", fields: errors.array() });
    }
    
    const result = SurveyService.answer(req.params.id, req.body); 
    if(result.status == 'error')
    {
        return res.status(result.message  ? 400 : 500).send({
            status: "error",
            message: result.message ?? "An error occured answering survey"
        });
    } 

    return res.status(201).send({
        status: "success",
        message: "Survey Answered Successfully",
        response: result.data
    });
}

export async function results(req: Request, res: Response) {
    //Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", fields: errors.array() });
    }
    
    const result = SurveyService.results(req.params.id); 
    if(result.status == 'error')
    {
        return res.status(result.message  ? 400 : 500).send({
            status: "error",
            message: result.message ?? "An error occured loading survey"
        });
    } 

    return res.status(201).send({
        status: "success",
        message: "Survey Results Loaded Successfully",
        results: result.data
    });
}