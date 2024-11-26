import { CustomError, IStudent } from './student.interface';
import { Student } from './student.schema';

const createStudentIntoDB = async (
  studenData: IStudent,
): Promise<IStudent | null> => {
  try {
    const result = await Student.create(studenData);
    return result;
  } catch (error) {
    throw new Error((error as CustomError).message);
  }
};
// get all student from db
const getAllStudentsFromDB = async (): Promise<IStudent[] | null> => {
  try {
    const result = await Student.find();
    return result;
  } catch (error) {
    throw new Error((error as CustomError).message);
  }
};

// get a single one student
const getASingleStudentFromDB = async (
  id: string,
): Promise<IStudent | null> => {
  try {
    const result = await Student.findOne({ id });
    return result;
  } catch (error) {
    throw new Error((error as CustomError).message);
  }
};

export { createStudentIntoDB, getAllStudentsFromDB, getASingleStudentFromDB };
