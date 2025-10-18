
export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  role: string;
  salary: number;
  dateOfJoining: string;
  status: 'Active' | 'Inactive';
}

export enum Department {
  HR = 'Human Resources',
  ENGINEERING = 'Engineering',
  MARKETING = 'Marketing',
  SALES = 'Sales',
  FINANCE = 'Finance',
}
