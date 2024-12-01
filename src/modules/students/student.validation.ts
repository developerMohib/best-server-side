import { z } from 'zod';

const nameValidatiionScheam = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First Name have to be minimum lenght 2' })
    .max(20, { message: 'First Name maximum charecter is 20' })
    .refine((value) => {
      const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
      return firstChar;
    }),
  midName: z
    .string()
    .max(20, { message: 'middle name will be 20 charecter' })
    .optional(),
  lastName: z
    .string()
    .max(20, { message: 'Last name maximum charecter is 20' }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),

  fatherContactNo: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),
  fatherProffession: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),
  motherName: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),
  motherContactNo: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),
  motherProffession: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),
  occufassion: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),
  contact: z.string().refine((value: string) => {
    const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
    return firstChar;
  }),
  address: z.string(),
});

// student data validation using zod
const studentValidationData = z.object({
  id: z.string(),
  password: z.string(),
  name: nameValidatiionScheam,
  email: z.string().email({ message: 'Use a valid email' }),
  image: z.string().optional(),
  gender: z.enum(['male', 'female']),
  birthDate: z.string().optional(),
  contactNo: z
    .string()
    .regex(/^\d{11}$/, { message: 'Contact number must be 11' }),
  emargancyContactNo: z
    .string()
    .regex(/^\d{11}$/, { message: 'Contact number must be 11' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  permanentAddres: z.string(),
  presentAddres: z.string().optional(),
  active: z.enum(['active', 'blocked']).default('active'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  isDeleted : z.boolean(),
});

export default studentValidationData;
