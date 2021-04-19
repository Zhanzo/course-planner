import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule,} from 'angularx-social-login';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {CoursePlanDetailsComponent} from './components/course-plan-details/course-plan-details.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, LogInComponent, UserDetailsComponent, CoursePlanDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgbModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '578371408744-rgsj7tjokbiquja3rois7ai52r2grrpb.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
