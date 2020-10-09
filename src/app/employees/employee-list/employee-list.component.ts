import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  subscription : Subscription;
  constructor(private empService: EmployeeService) { 
    
  }
  

  ngOnInit(): void {  
    this.employees = this.empService.getEmployees();
    
  }

}
