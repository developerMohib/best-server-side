import { CustomError, IStudent } from './student.interface';
import { Student } from './student.schema';

const createStudentIntoDB = async (
  studentData: IStudent,
): Promise<IStudent | null> => {
  try {
    // const result = await Student.create(studenData);  // custom mathod
    const newStudent = new Student(studentData);

    if (await newStudent.isExistStudent(studentData.id)) {
      throw new Error('This student already exists');
    }

    // Save the new student if it doesn't exist
    const result = await newStudent.save();

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
