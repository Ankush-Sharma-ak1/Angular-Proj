import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { routeTransitionAnimations } from '../shared/route-tranistion.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [routeTransitionAnimations]
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
    this.isAdmin = false;
 }

 prepareRoute(outlet: RouterOutlet) {
  return outlet && 
    outlet.activatedRouteData && 
    outlet.activatedRouteData['animationState'];
 }

}
