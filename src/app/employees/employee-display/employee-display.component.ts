import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-display',
  templateUrl: './employee-display.component.html',
  styleUrls: ['./employee-display.component.css']
})
export class EmployeeDisplayComponent implements OnInit {

  @Input() employee: Employee;
  @Input() index: number;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  viewDetail(empId){
    this.router.navigate(['/emp', empId]);
  }

  
}
