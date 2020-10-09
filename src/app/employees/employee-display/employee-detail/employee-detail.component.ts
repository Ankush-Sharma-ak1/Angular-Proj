import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/shared/auth.service';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  employeeId: number;
  employee : Employee;
  isAdmin= false;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, 
    private empService: EmployeeService,
     private router: Router,
     private authService: AuthService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
          this.employeeId = +params['id'];
      }
    )

    this.employee= this.empService.getEmployee(this.employeeId);
   
    this.subscription = this.authService.adminRight.subscribe(
      (value) => {
        if(value) {
          this.isAdmin= true;
        }
      }
    );  

  }

  onEdit() {
    this.empService.startEdit.next(this.employeeId);
    this.router.navigate(['/edit', this.employeeId]);
    
  }

  onDelete() {
    this.empService.deleteEmployee(this.employee);
    this.router.navigate(['list']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.isAdmin = false;
 }
 
}
