import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit{

  employeeId: number;
  employee : Employee;

  constructor(private route: ActivatedRoute, private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
          this.employeeId = +params['id'];
      }
    )

    this.employee= this.empService.getEmployee(this.employeeId);
    console.log(this.employee);

  }

  onEdit() {
    this.empService.startEdit.next(this.employeeId);
    this.router.navigate(['/edit', this.employeeId]);
    
  }

  onDelete() {
    this.empService.deleteEmployee(this.employee);
    this.router.navigate(['list']);
  }
 
}
