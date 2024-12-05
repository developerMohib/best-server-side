"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const nameValidatiionScheam = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(2, { message: 'First Name have to be minimum lenght 2' })
        .max(20, { message: 'First Name maximum charecter is 20' })
        .refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    midName: zod_1.z
        .string()
        .max(20, { message: 'middle name will be 20 charecter' })
        .optional(),
    lastName: zod_1.z
        .string()
        .max(20, { message: 'Last name maximum charecter is 20' }),
});
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    fatherContactNo: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    fatherProffession: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    motherName: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    motherContactNo: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    motherProffession: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
});
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    occufassion: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    contact: zod_1.z.string().refine((value) => {
        const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
        return firstChar;
    }),
    address: zod_1.z.string(),
});
// student data validation using zod
const studentValidationData = zod_1.z.object({
    id: zod_1.z.string(),
    password: zod_1.z.string(),
    name: nameValidatiionScheam,
    email: zod_1.z.string().email({ message: 'Use a valid email' }),
    image: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['male', 'female']),
    birthDate: zod_1.z.string().optional(),
    contactNo: zod_1.z
        .string()
        .regex(/^\d{11}$/, { message: 'Contact number must be 11' }),
    emargancyContactNo: zod_1.z
        .string()
        .regex(/^\d{11}$/, { message: 'Contact number must be 11' }),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    permanentAddres: zod_1.z.string(),
    presentAddres: zod_1.z.string().optional(),
    active: zod_1.z.enum(['active', 'blocked']).default('active'),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    isDeleted: zod_1.z.boolean(),
});
exports.default = studentValidationData;
