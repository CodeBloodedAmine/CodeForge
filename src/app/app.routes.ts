import { provideRouter, RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './front/courses-list/courses-list.component';
import { CourseDetailComponent } from './front/course-detail/course-detail.component';
import { LoginComponent } from './front/login/login.component';
import { SignUpComponent } from './front/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './front/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './back/admin-dash/admin-dash.component';
import { HomeComponent } from './front/home/home.component';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'course', component: CoursesListComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/login' }
];