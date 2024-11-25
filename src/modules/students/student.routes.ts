import { Router } from 'express';
import { createStudent, getAllStudents, getASingleStudent } from './student.controller';

const router = Router();

router.post('/create-student', createStudent);
router.get('/get-students', getAllStudents);
router.get('/get-student/:id', getASingleStudent);

export const studentRoutes = router;
