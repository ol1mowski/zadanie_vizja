export const UserType = {
  UNAUTHENTICATED: 'unauthenticated',
  STUDENT: 'student',
  ADMIN: 'admin',
  CANDIDATE: 'candidate'
} as const;

export type UserType = typeof UserType[keyof typeof UserType];

export interface User {
  id: string;
  type: UserType;
  name: string;
  email: string;
  studentId?: string;
  candidateData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}
