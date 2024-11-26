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
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    minlength: [2, 'First name minimum length 2'],
    maxlength: [20, 'First name maximun length 20 charecters'],
  },
  midName: { type: String },
  lastName: {
    type: String,
    require: [true, 'Last Name is required'],
    maxlength: [20, 'First name maximun length 20 charecters'],
  },
});

// sub schema for guardian
const guardianSchema = new Schema<IGuardian>({
  fatherContactNo: {
    type: String,
    require: [true, 'Father Contact Number is required'],
    match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
    unique: true,
  },
  fatherProffession: {
    type: String,
    require: true,
  },
  fatherName: {
    type: String,
    require: true,
  },
  motherContactNo: {
    type: String,
    match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
    unique: true,
  },
  motherName: { type: String, require: true },
  motherProffession: { type: String, require: true },
});

// sub schema for local guardian
const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String, require: true },
  occufassion: { type: String, require: true },
  contact: {
    type: String,
    require: [true, 'Contact is required'],
    match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
  },
  address: { type: String, require: true },
});

const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: [true, 'id is mandatory'],
    unique: true,
  },
  name: {
    type: userSchema,
    required: [true, 'name is required to give'],
  },
  email: {
    type: String,
    required: [true, 'Provide a valid email'],
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    unique: true,
  },
  image: String,
  gender: { type: String, enum: ['male', 'female'], required: true },
  birthDate: String,
  contactNo: {
    type: String,
    require: [true, 'Contact is required'],
    match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
    unique: true,
  },
  emargancyContactNo: {
    type: String,
    require: [true, 'Contact is required'],
    match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
    unique: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  permanentAddres: String,
  presentAddres: String,
  active: { type: String, enum: ['active', 'blocked'], default: 'active' },
  guardian: guardianSchema,
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Need to provide your guardian details'],
  },
});

// 3. Create a Model.
export const Student = model<IStudent>('Student', studentSchema);
