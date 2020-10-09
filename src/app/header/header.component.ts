import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin= false;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.adminRight.subscribe(
      (value) => {
        if(value) {
          this.isAdmin= true;
        }
      }
    );  
  }

  adminLogout() {
    this.authService.logout();
    this.isAdmin = false;
    this.authService.adminRight.next(null);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
   this.authService.adminRight.next(null);
    this.isAdmin = false;
 }

}
