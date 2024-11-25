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
const getAllStudentsFromDB = async (): Promise<IStudent[] | null> => {
  try {
    const result = await Student.find();
    return result;
  } catch (error) {
    console.log(error);
    return null 
  }
};

// get a single one student
const getASingleStudentFromDB = async (id:string) : Promise<IStudent | null> => {
  try {
    const result = await Student.findOne({id})
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

export { createStudentIntoDB, getAllStudentsFromDB,getASingleStudentFromDB };
