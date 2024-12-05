"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentInDB = exports.deleteStudentFromDB = exports.getASingleStudentFromDB = exports.getAllStudentsFromDB = exports.createStudentIntoDB = void 0;
const mongoose_1 = require("mongoose");
const student_schema_1 = require("./student.schema");
const createStudentIntoDB = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await Student.create(studenData);  // custom mathod
        const newStudent = new student_schema_1.Student(studentData);
        if (yield newStudent.isExistStudent(studentData.id)) {
            throw new Error('This student already exists');
        }
        // Save the new student if it doesn't exist
        const result = yield newStudent.save();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createStudentIntoDB = createStudentIntoDB;
// get all student from db
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_schema_1.Student.find();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getAllStudentsFromDB = getAllStudentsFromDB;
// get a single one student
const getASingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.Types.ObjectId(id);
        // const result = await Student.findOne({ id });
        const result = yield student_schema_1.Student.aggregate([{ $match: { _id: objectId } }]);
        return result.length > 0 ? result[0] : null;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getASingleStudentFromDB = getASingleStudentFromDB;
// delete a single one student, just stop the student
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_schema_1.Student.findOneAndUpdate({ _id: id }, { isDeleted: true });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteStudentFromDB = deleteStudentFromDB;
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
const updateStudentInDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    const result = yield student_schema_1.Student.findByIdAndUpdate(objectId, data, {
        new: true,
    });
    return result;
});
exports.updateStudentInDB = updateStudentInDB;
