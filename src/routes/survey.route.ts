import express from  'express';
import { body } from 'express-validator';
import { index, get, store, destroy, update, answer, results } from '../controllers/survey.controller';
import Validation from '../middlewares/validation.middleware';

const router = express.Router();

// Get Surveys
router.get('/', index);

// Get Survey By Id
router.get('/:id', get);

// Create Survey
router.post(
    '/',
    body('title').isLength({ min: 1 }).withMessage('requires at least 1 character'),
    body('questions').custom(value => Validation.question(value)),
    store
);

// Update Survey
router.patch(
    '/:id',
    body('title').isLength({ min: 1 }).withMessage('requires at least 1 character'),
    body('questions').custom(value => Validation.question(value)),
    update
);
    
// Delete Survey By Id
router.delete('/:id', destroy);

// Answer Survey
router.post(
    '/:id/answer',
    body('answers').custom(value => Validation.answer(value)),
    answer
);

// Survey Result 
router.get('/:id/results', results);

export default router;