import { get } from 'config';
import express from  'express';
import { body, validationResult } from 'express-validator';
import { index, store, destroy } from '../controllers/survey.controller';
import Validation from '../middlewares/validation.middleware';

const router = express.Router();

//Get Surveys
router.get('/', index);

//Get Survey By Id
router.get('/:id', get);

// Create Survey
router.post(
    '/',
    body('title').isLength({ min: 1 }).withMessage('requires at least 1 character'),
    body('questions').custom(value => Validation.question(value)),
    store
);

//Delete Survey By Id
router.delete('/:id', destroy);

// // Create Survey
// router.patch(
//     '/:id',
//     body('id').isLength({ min: 1 }).withMessage('Survey ID is required'),
//     body('title').isLength({ min: 1 }).withMessage('requires at least 1 character'),
//     body('questions').custom(value => Validation.question(value)),
//     update
// );
    
export default router;