import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employees: Employee[];
  subscription : Subscription;

  constructor(private empService: EmployeeService) { 
    this.employees = this.empService.getEmployees();
  }

  ngOnInit(): void {
    this.subscription = this.empService.employeesChanged.subscribe(
      (emp : Employee[]) => {
        this.employees = emp;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
