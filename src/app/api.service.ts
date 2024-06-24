import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student.modal';

@Injectable({
  providedIn: 'root'
})
export class APISERVICE {

  constructor(private httpClient: HttpClient) { }

  api = "http://localhost:9000/api"

   isLogged: boolean = false;

  setLoggedIn(value: boolean): void {
    this.isLogged = value;
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

   // Employe related API methods
  saveEmployee(employee: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/employee/save`, employee);
  }

  loginEmployee(credentials: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/employee/login`, credentials);
  }

  // Student related API methods
  public savestudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${this.api}/students/save`, student);
  }

  public getstudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.api}/students/getAll`);
  }

  public deletestudent(studentId: number) {
    return this.httpClient.delete(`${this.api}/students/delete/${studentId}`);
  }

  public getstudent(studentId: number) {
    return this.httpClient.get<Student>(`${this.api}/students/get/${studentId}`);
  }

  public updatestudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.api}/students/update/`, student);
  }
}
