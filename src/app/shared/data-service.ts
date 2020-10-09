import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";


import { Employee } from '../models/employee.model';

@Injectable({providedIn: 'root'})
export class DataService {

    private employeeList: AngularFireList<any>;

    constructor(private firebase: AngularFireDatabase) {
        this.employeeList = this.firebase.list('employeeList');
    }

    getUsersFromFirebase() {
        return this.employeeList;
    }

    saveEmployeeToFirebase(employee: Employee) {
        this.employeeList.push(employee);
    }

    updateEmployee(employee: Employee) {
        let $key = employee.$key;
        delete employee.$key;
        this.employeeList.update($key, employee);
    }

    deleteEmployee($key: string) {
        this.employeeList.remove($key);
    }

}
   