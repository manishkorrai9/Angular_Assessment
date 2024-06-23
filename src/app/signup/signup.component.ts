import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { APISERVICE } from '../api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MatDialogModule  } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
@Component({
  selector: 'app-signup',
  standalone: true,
  imports : [ 
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule 
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm: FormGroup;
  passwordHidden: boolean = true;
  conformPasswordHidden: boolean = true;

  constructor(
    private fb: FormBuilder,
    private apiService: APISERVICE, 
    private router: Router,
    private dialogRef: MatDialogRef<SignupComponent>,
    private snackBar: MatSnackBar,
  )
     {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // conformPassword: ['', [Validators.required]],
      },/* { validators: this.passwordMatchValidator }*/);
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordHidden = !this.passwordHidden;
    } else if (field === 'conformPassword') {
      this.conformPasswordHidden = !this.conformPasswordHidden;
    }
  }
  // passwordMatchValidator(group: FormGroup) {
  //   const password = group.get('password')?.value;
  //   const confirmPassword = group.get('conformPassword')?.value;
  //   return password === confirmPassword ? null : { mismatch: true };
  // }

  onSignUp(): void {
    console.log('onSignUp')
    const bodyData = {
      employeename: this.signUpForm.get('name')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value
    };
    if (this.signUpForm.valid) {
      this.apiService.saveEmployee(bodyData).subscribe(response => {
        console.log('Employee saved successfully:', response);
        this.dialogRef.close(true);
        this.router.navigate(['/login']);
        this.snackBar.open(
             "Employee regestred successfully.",
          "close",
          {
            panelClass: "snackBarSuccess",
            duration: 2000,
          }
        );
      }, error => {
        console.error('Error saving employee:', error);
      });
    }
  }
}