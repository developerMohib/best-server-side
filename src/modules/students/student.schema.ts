// Create a Schema corresponding to the document interface.

import { Schema, model } from 'mongoose';
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUserName,
} from './student.interface';

// sub schema for user name
const userSchema = new Schema<IUserName>({
  firstName: { type: String, required: true },
  midName: { type: String },
  lastName: { type: String, require: true },
});

// sub schema for guardian
const guardianSchema = new Schema<IGuardian>({
  fatherContactNo: {
    type: String,
    require: true,
  },
  fatherProffession: {
    type: String,
    require: true,
  },
  fatherName: {
    type: String,
    require: true,
  },
  motherContactNo: { type: String, require: true },
  motherName: { type: String, require: true },
  motherProffession: { type: String, require: true },
});

// sub schema for local guardian
const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String, require: true },
  occufassion: { type: String, require: true },
  contact: { type: String, require: true },
  address: { type: String, require: true },
});

const studentSchema = new Schema<IStudent>({
  id: String,
  name: userSchema,
  email: { type: String, required: true },
  image: String,
  gender: { type: String, enum: ['male', 'female'], required: true },
  birthDate: String,
  contactNo: String,
  emargancyContactNo: String,
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  permanentAddres: String,
  presentAddres: String,
  active: {type : String ,
    enum :['active', 'blocked']
  },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
});

// 3. Create a Model.
export const Student = model<IStudent>('Student', studentSchema);
