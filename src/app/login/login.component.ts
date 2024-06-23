import { Component, OnInit } from '@angular/core';
import { NgForm,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { APISERVICE } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth-guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ]
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private apiService: APISERVICE, private router: Router, private authService : AuthService) { }

  ngOnInit(): void { }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      height: '520px',
      width: '720px',
      panelClass: 'bg-white',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed', result);
    });
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const email = loginForm.value.email;
      const password = loginForm.value.password;

      this.authService.login(email, password).subscribe(response => {
        if (response.status === true) {
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Login error:', response.message);
        }
      }, error => {
        console.error('Login error:', error);
      });
    }
  }
}
