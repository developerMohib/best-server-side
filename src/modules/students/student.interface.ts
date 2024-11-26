// Create an interface representing a document in MongoDB.
export type CustomError = {
  message: string;
};

export interface IUserName {
  firstName: string;
  midName?: string;
  lastName: string;
}
export interface ILocalGuardian {
  name: string;
  occufassion: string;
  contact: string;
  address: string;
}

export interface IGuardian {
  fatherName: string;
  fatherProffession: string;
  fatherContactNo: string;
  motherName: string;
  motherProffession: string;
  motherContactNo: string;
}

export interface IStudent {
  id: string;
  name: IUserName;
  email: string;
  image?: string;
  gender: 'male' | 'female';
  birthDate?: string;
  contactNo: string;
  emargancyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddres: string;
  permanentAddres: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  active: 'active' | 'blocked';
}
