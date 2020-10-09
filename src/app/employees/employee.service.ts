import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Employee } from '../models/employee.model';
import { DataService } from '../shared/data-service';

@Injectable()
export class EmployeeService {
  
        startEdit = new BehaviorSubject<number> (null);

        private listEmployees: Employee[];

          constructor(private dataService: DataService) {
           
          }

          getEmployees(): Employee[] {
            this.listEmployees = [];
            let count = 0;
            this.dataService.getUsersFromFirebase().snapshotChanges().forEach(userSnapShot => {
                if(count === 0) {
                  userSnapShot.forEach(employeeSnapShot => {
                        let employee = employeeSnapShot.payload.toJSON();
                        employee['$key'] = employeeSnapShot.key;
                        this.listEmployees.push(employee as Employee);
                  })
                  count++;
                }
            })
            return this.listEmployees;
          }

          createEmployee(employee: Employee) {
            this.dataService.saveEmployeeToFirebase(employee);
          }

          getEmployee(empId: number): Employee{
            return this.listEmployees[empId];
          }
          
          updateEmployee(employee: Employee) {
            this.dataService.updateEmployee(employee);
          }

          deleteEmployee(employee: Employee) {
           this.dataService.deleteEmployee(employee.$key);
          }


}