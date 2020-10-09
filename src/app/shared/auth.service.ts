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
        this.setUserToLocalStorage();
    }

   loginOnFirebase(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
   } 

   setUserToLocalStorage() {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
   }
   logout(){
    this.afAuth.auth.signOut();
   this.adminRight.next(null);
    localStorage.removeItem('user');

}
}