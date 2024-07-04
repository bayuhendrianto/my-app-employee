export interface IEmployeeModel {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export class EmployeeModel implements IEmployeeModel {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;

  constructor(model?: any) {
    model = model || {};
    this.id = model.id || null;
    this.userName = model.userName || null;
    this.firstName = model.firstName || null;
    this.lastName = model.lastName || null;
    this.email = model.email || null;
    this.birthDate = model.birthDate || null;
    this.basicSalary = model.basicSalary || 0;
    this.status = model.status || null;
    this.group = model.group || null;
    this.description = model.description || null;
  }
}
