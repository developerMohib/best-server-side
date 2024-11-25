import { Request, Response } from 'express';
import { IStudent } from './student.interface';
import { createStudentIntoDB } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studenData }: { student: IStudent } = req.body;
    const result = await createStudentIntoDB(studenData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      result,
    });
  } catch (error) {
    console.error(error);
  }
};
export { createStudent };
