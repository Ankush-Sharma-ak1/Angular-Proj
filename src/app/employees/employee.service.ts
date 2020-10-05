import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService {

        employeesChanged = new Subject<Employee[]>();
        startEdit = new BehaviorSubject<number> (null);

        private listEmployees: Employee[] = [
            {
              name: 'Sahil',
              email: 'sahil.sh@catalystone.com',
              module: 'LMS',
              teamName:'UX-Wizards',
              project: 'Web project',
              projectLink: 'https://www.w3schools.com',
              photoPath: 'assets/images/male-icon.jpg',
            },
            {
              name: 'Deeksha',
              email: 'deeksha.sh@catalystone.com',
              module: 'LMS',
              teamName:'UX-Wizards',
              project: 'Web project',
              projectLink: 'https://www.w3schools.com',
              photoPath: 'assets/images/female.png',
            },
            {
              name: 'Karan',
              email: 'karan.sh@catalystone.com',
              module: 'Application Design',
              teamName:'CRUX',
              project: 'Web project',
              projectLink: 'https://www.w3schools.com',
              photoPath: 'assets/images/male.png',
            },
        
          ];

          getEmployees() : Employee[] {
              return this.listEmployees;
          }

          createEmployee(employee: Employee) {
            this.listEmployees.push(employee);
            this.employeesChanged.next(this.listEmployees.slice());
          
        }

          getEmployee(empId: number): Employee{
            return this.listEmployees[empId];
          }
          
          updateEmployee(index: number, employee: Employee) {
            this.listEmployees[index] = employee;
            this.employeesChanged.next(this.listEmployees.slice());
          }

          deleteEmployee(index) {
            this.listEmployees.splice(index,1);
            this.employeesChanged.next(this.listEmployees.slice());
          }


}