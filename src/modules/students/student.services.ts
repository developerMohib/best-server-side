import { IStudent } from './student.interface';
import { Student } from './student.schema';

const createStudentIntoDB = async (
  studenData: IStudent,
): Promise<IStudent | undefined> => {
  try {
    const result = await Student.create(studenData);
    return result;
  } catch (error) {
    console.log(error);
  }
};
// get all student from db
const getAllStudentsFromDB = async (): Promise<IStudent[] | undefined> => {
  try {
    const result = await Student.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { createStudentIntoDB, getAllStudentsFromDB };
