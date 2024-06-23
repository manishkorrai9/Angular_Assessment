import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AuthGuard } from './auth-guard/auth.guard';



const routes: Routes = [
  { path: 'login', loadComponent: () => 
    import('./login/login.component').then(m => m.LoginComponent) },

  { path: 'dashboard', loadComponent: () => 
    import('./dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },

  // { path: 'add-student', loadComponent: () => 
  //   import('./add-student/add-student.component').then(m => m.AddStudentComponent) },

  { path: 'add-student', component: AddStudentComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }