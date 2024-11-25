import { IStudent } from './student.interface';
import { Student } from './student.schema';

const createStudentIntoDB = async (studenData: IStudent) => {
  try {
    const result = await Student.create(studenData);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { createStudentIntoDB };
