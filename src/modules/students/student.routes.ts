import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getASingleStudent,
} from './student.controller';

const router = Router();

router.post('/create-student', createStudent);
router.get('/get-students', getAllStudents);
router.get('/get-student/:id', getASingleStudent);
router.delete('/get-student/:id', deleteStudent);

export const studentRoutes = router;
