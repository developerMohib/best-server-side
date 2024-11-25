import { Request, Response } from 'express';
import { IStudent } from './student.interface';
import { createStudentIntoDB, getAllStudentsFromDB, getASingleStudentFromDB } from './student.services';

// create a student
const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    // send to services function

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
  } catch (error) {
    console.log(error);
  }
};

// get a single student
const getASingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id ;
    const result  =await getASingleStudentFromDB(studentId) 
    res.status(200).json({
      success : true,
      message : "Student is retrived successfully",
      result
    })
  } catch (error) {
    console.log(error);
  }
};

export { createStudent, getAllStudents,getASingleStudent };
