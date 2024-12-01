import { Types } from 'mongoose';
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
    const objectId = new Types.ObjectId(id);
    // const result = await Student.findOne({ id });
    const result = await Student.aggregate([{ $match: { _id : objectId } }]);

    return result.length > 0 ? (result[0] as IStudent) : null;
  } catch (error) {
    throw new Error((error as CustomError).message);
  }
};

// delete a single one student, just stop the student
const deleteStudentFromDB = async (id: string): Promise<IStudent | null> => {
  try {
    const result = await Student.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
    );
    return result;
  } catch (error) {
    throw new Error((error as CustomError).message);
  }
};

// update student data by put method
// const updateStudentInDB = async (

//   studentId: string,
//   nameFields: IStudent,
// ): Promise<IStudent | null> => {

//   try {
//     const result = await Student.findOneAndUpdate(
//       { id: studentId }, // Use custom `id` field
      
//       { new: true }, // Return the updated document
//     );
//     return result;
//   } catch (error) {
//     throw new Error((error as CustomError).message);
//   }
// };

const updateStudentInDB = async (id: string, data: IStudent) => {
  
  const objectId = new Types.ObjectId(id);
  const result = await Student.findByIdAndUpdate(objectId, data, {
      new: true,
  })
  return result
}








export {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getASingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
};
