import { Component, OnInit } from '@angular/core';
import { APISERVICE } from '../api.service';
import { Student } from '../student.modal';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth-guard/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dataSource: Student[] = [];

  displayedColumns: string[] = ['studentId', 'studentName', 'studentContactNumber', 'studentAddress', 'studentDepartment', 'studentGender', 'studentSkills', 'edit', 'delete'];

  constructor(private studentService: APISERVICE,
    private authService: AuthService,
    private router: Router) {
   
  }

  ngOnInit(): void {
    this.getstudentList();
  }

 

  deletestudent(studentId: number): void {
    console.log(studentId);
    this.studentService.deletestudent(studentId).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.getstudentList();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  getstudentList(): void {
    this.studentService.getstudents().subscribe(
      {
        next: (res: Student[]) => {
          this.dataSource = res;
        },
        error: (err: HttpErrorResponse)=> {
          console.log(err);
        }
      }
    );
  }

  // updatestudent(studentId: number) {
  //   this.router.navigate(['/add-student', studentId]);
  // }


  updatestudent(student: Student) {
    console.log(student);
    this.router.navigate(['/add-student'], { queryParams: { user: JSON.stringify(student) } });
  }
  

  goToAddStudent() {
   this.router.navigate(['/add-student'])
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
