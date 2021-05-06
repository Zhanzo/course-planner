import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CoursePlanDetailsComponent } from './components/course-plan-details/course-plan-details.component';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'course-plan-details', component: CoursePlanDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
