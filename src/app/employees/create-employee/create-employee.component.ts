import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {

  employee: Employee = {
    name: null,
    email: null,
    module: null,
    teamName: null,
    project: null,
    projectLink: null,
    photoPath: null,

  };
  employeeId: number;
  editMode = false;
  subscription: Subscription;

  constructor(private empService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
          this.employeeId = +params['id']; 
      }
    )

    
    this.subscription = this.empService.startEdit.subscribe(
      (index: number) => {
        if(index !== null) {
          this.editMode= true;
          this.employee = this.empService.getEmployee(this.employeeId);
        }
      }
    );  
  }
  onSave() {
    if(this.editMode)
      this.empService.updateEmployee(this.employeeId, this.employee);
    else
      this.empService.createEmployee(this.employee);
  this.router.navigate(['list']);
  }

  ngOnDestroy() {
     this.subscription.unsubscribe();
    this.empService.startEdit.next(null);
     this.editMode = false;
  }
}
