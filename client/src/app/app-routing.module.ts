import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CoursePlanDetailsComponent } from './components/course-plan-details/course-plan-details.component';
import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-plan/:id',
    component: CoursePlanDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LogInComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
