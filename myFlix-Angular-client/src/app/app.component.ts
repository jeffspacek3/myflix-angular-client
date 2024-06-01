import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginUserFormComponent } from './login-user-form/login-user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { ProfileComponent } from './profile/profile.component';
import { FetchApiDataService } from './fetch-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';


constructor(public dialog: MatDialog) { }
// This is the function that will open the dialog when the signup button is clicked  
openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    width: '280px'
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(LoginUserFormComponent, {
      width: '400px',
    });
  }
  openMoviesDialog(): void {
    this.dialog.open(MovieInfoComponent, {
      width: '500px'
    });
  }
}
