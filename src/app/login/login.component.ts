import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage="";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
   this.authService.loginOnFirebase(form.value.email, form.value.password).then(() =>{
    this.authService.adminRight.next(true);
     this.router.navigate(['/form']);
   })
   .catch(error => {
         this.errorMessage = "Sorry, we couldn't find an account with that username in the firebase." ;
     
   })
   form.reset();
  }


}
