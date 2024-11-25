import { Router } from 'express';
import { createStudent, getAllStudents } from './student.controller';

const router = Router();

router.post('/create-student', createStudent);
router.get('/get-students', getAllStudents);

export const studentRoutes = router;
