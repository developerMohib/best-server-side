// Create an interface representing a document in MongoDB.
export type CustomError = {
  message: string;
};

export interface IUserName {
  firstName: string;
  midName?: string | null;
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
  image?: string | null;
  gender: 'male' | 'female';
  birthDate?: string | null;
  contactNo: string;
  emargancyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddres?:string | null;
  permanentAddres: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  active: 'active' | 'blocked';
}
