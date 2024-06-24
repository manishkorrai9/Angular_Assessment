import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { APISERVICE } from '../api.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../student.modal';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  isCreateStudent: boolean = true;
  skills: string[] = [];
  student: Student | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: APISERVICE,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('Query Params:', params);
      if (params['user']) {
        console.log('User Param:', params['user']);
        this.student = JSON.parse(params['user']);
        console.log('Parsed Student:', this.student);
        this.isCreateStudent = false;
      }
      this.initForm();
    }); 
    console.log(this.student);
  }

  private initForm(): void {
    this.studentForm = this.formBuilder.group({
      studentId: [{ value: this.student?.studentId || '', disabled: true }],
      studentName: [this.student?.studentName || '', Validators.required],
      studentContactNumber: [this.student?.studentContactNumber || '', Validators.required,],
      studentAddress: [this.student?.studentAddress || '', Validators.required],
      studentDepartment: [this.student?.studentDepartment || '', Validators.required],
      studentGender: [this.student?.studentGender || '',  Validators.required],
      studentSkills: [{ value: this.student?.studentSkills || '', disabled: true }, Validators.required]
    });

    if (this.student && this.student.studentId > 0) {
      this.isCreateStudent = false;
      if (this.student.studentSkills) {
        this.skills = this.student.studentSkills.split(', ');
      }
    }
  }

  onSkillsChanges(event: any, skill: string): void {
    const skills = this.studentForm.get('studentSkills');
    if (skills) { 
      if (event.checked) {
        this.skills.push(skill);
      } else {
        const index = this.skills.indexOf(skill);
        if (index >= 0) {
          this.skills.splice(index, 1);
        }
      }
      skills.setValue(this.skills.join(', '));
    }
  }

  checkSkills(skill: string): boolean {
    return this.skills.includes(skill);
  }

  saveStudent(): void {
    const formData = { ...this.studentForm.getRawValue() };
    const saveObservable = this.isCreateStudent
      ? this.studentService.savestudent(formData)
      : this.studentService.updatestudent(formData);

    saveObservable.subscribe({
      next: (res: Student) => {
        console.log(res);
        this.studentForm.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }
  backToDashboard () {
    this.router.navigate(['/dashboard']);
    console.log('click')
  }
  selectGender(gender: string): void {
    this.studentForm.patchValue({ studentGender: gender });
  }
}
