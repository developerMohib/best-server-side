
import { Router } from 'express';
import { createStudent } from './student.controller';

const router = Router();

router.post('/create-student',createStudent);

export const studentRoutes = router;
