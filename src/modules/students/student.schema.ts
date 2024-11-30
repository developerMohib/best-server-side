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
    trim: true,
    minlength: [2, 'First name minimum length 2'],
    maxlength: [20, 'First name maximun length 20 charecters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  midName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle name maximum length 20 charecters'],
  },
  lastName: {
    type: String,
    trim: true,
    require: [true, 'Last Name is required'],
    maxlength: [20, 'First name maximun length 20 charecters'],
  },
});

// sub schema for guardian
const guardianSchema = new Schema<IGuardian>({
  fatherContactNo: {
    type: String,
    trim: true,
    require: [true, 'Father Contact Number is required'],
    match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
    unique: true,
  },
  fatherProffession: {
    type: String,
    trim: true,
    require: true,
    capitalize: {
      validator: function (value: string) {
        const fatherProfStr = value.charAt(0).toUpperCase() + value.slice(1);
        return fatherProfStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  fatherName: {
    type: String,
    trim: true,
    require: true,
    capitalize: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  motherContactNo: {
    type: String,
    match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
    unique: true,
  },
  motherName: {
    type: String,
    require: true,
    trim: true,
    capitalize: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  motherProffession: { type: String, require: true, trim: true },
});

// sub schema for local guardian
const localGuardianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    require: true,
    trim: true,
    capitalize: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  occufassion: {
    type: String,
    require: true,
    capitalize: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  contact: {
    type: String,
    require: [true, 'Contact is required'],
    match: [/^\d{11}$/, 'Contact number have to exactly 11 '],
    trim: true,
  },
  address: { type: String, require: true, trim: true },
});

const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    trim: true,
    required: [true, 'id is mandatory'],
    unique: true,
  },
  name: {
    type: userSchema,
    trim: true,
    required: [true, 'name is required to give'],
    capitalize: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  email: {
    type: String,
    required: [true, 'Provide a valid email'],
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    unique: true,
    trim: true,
  },
  image: { type: String, trim: true },
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
  permanentAddres: { type: String, trim: true },
  presentAddres: { type: String, trim: true },
  active: { type: String, enum: ['active', 'blocked'], default: 'active' },
  guardian: guardianSchema,
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Need to provide your guardian details'],
  },
});

// 3. Create a Model.
export const Student = model<IStudent>('Student', studentSchema);
