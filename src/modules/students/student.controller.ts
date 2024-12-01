import { Request, Response } from 'express';
import { IStudent } from './student.interface';
import {
  createStudentIntoDB,
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getASingleStudentFromDB,
  updateStudentInDB,
} from './student.services';
import studentValidationData from './student.validation';

// create a student
const createStudent = async (
  req: Request,
  res: Response,
): Promise<void | any> => {
  try {
    const { student: studenData }: { student: IStudent } = req.body;

    const studenValidData = studentValidationData.parse(studenData);
    if (!studenValidData) {
      return res.status(400).json({
        success: false,
        message: 'Student data is required',
      });
    }

    const result = await createStudentIntoDB(studenValidData);
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

// delete a student from db
const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;
    const result = await deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
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

// update data in database
const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;

    console.log( 119, studentId)

    const result = await updateStudentInDB(studentId,updateData);

    res.status(200).json({
      success: true,
      message: 'Student data updated successfully',
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

export {
  createStudent,
  getAllStudents,
  getASingleStudent,
  deleteStudent,
  updateStudent,
};
