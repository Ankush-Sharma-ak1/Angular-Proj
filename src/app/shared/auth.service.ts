import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import {User  } from "firebase";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    user: User;
    adminRight = new BehaviorSubject<boolean> (null);

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.afAuth.authState.subscribe(user => {
            if (user){
              this.user = user;
              localStorage.setItem('user', JSON.stringify(this.user));
            } else {
              localStorage.setItem('user', null);
            }
          })
    }

   loginOnFirebase(email: string, password: string) {
        localStorage.setItem('user', JSON.stringify(this.user));
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
   } 

   // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
   
   logout(){
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');

}
}