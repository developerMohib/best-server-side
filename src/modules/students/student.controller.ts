import { Request, Response } from 'express';
import { IStudent } from './student.interface';
import {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getASingleStudentFromDB,
} from './student.services';

// create a student
const createStudent = async (
  req: Request,
  res: Response,
): Promise<void | any> => {
  try {
    const { student: studenData }: { student: IStudent } = req.body;
    if (!studenData) {
      return res.status(400).json({
        success: false,
        message: 'Student data is required',
      });
    }

    const result = await createStudentIntoDB(studenData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      result,
    });
  } catch (error: unknown) {
    // Handle error properly
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong na re bhai',
        error: error.message,
      });
    } else {
      // In case error is not an instance of Error
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
        error: String(error),
      });
    }
  }
};

// get all student
const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    // request to services function
    const result = await getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrived successfully',
      result,
    });
  } catch (error: string | unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// get a single student
const getASingleStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const studentId = req.params.id;
    const result = await getASingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      result,
    });
  } catch (error: string | unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export { createStudent, getAllStudents, getASingleStudent };
