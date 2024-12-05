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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudent = exports.deleteStudent = exports.getASingleStudent = exports.getAllStudents = exports.createStudent = void 0;
const student_services_1 = require("./student.services");
const student_validation_1 = __importDefault(require("./student.validation"));
// create a student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studenData } = req.body;
        const studenValidData = student_validation_1.default.parse(studenData);
        if (!studenValidData) {
            return res.status(400).json({
                success: false,
                message: 'Student data is required',
            });
        }
        const result = yield (0, student_services_1.createStudentIntoDB)(studenValidData);
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            result,
        });
    }
    catch (error) {
        // Handle error properly
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong na re bhai',
                error: error.message,
            });
        }
        else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
});
exports.createStudent = createStudent;
// get all student
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // request to services function
        const result = yield (0, student_services_1.getAllStudentsFromDB)();
        res.status(200).json({
            success: true,
            message: 'Students are retrived successfully',
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.getAllStudents = getAllStudents;
// get a single student
const getASingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const result = yield (0, student_services_1.getASingleStudentFromDB)(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is retrived successfully',
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.getASingleStudent = getASingleStudent;
// delete a student from db
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const result = yield (0, student_services_1.deleteStudentFromDB)(studentId);
        res.status(200).json({
            success: true,
            message: 'Student is deleted successfully',
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.deleteStudent = deleteStudent;
// update data in database
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const updateData = req.body;
        console.log(119, studentId);
        const result = yield (0, student_services_1.updateStudentInDB)(studentId, updateData);
        res.status(200).json({
            success: true,
            message: 'Student data updated successfully',
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.updateStudent = updateStudent;
