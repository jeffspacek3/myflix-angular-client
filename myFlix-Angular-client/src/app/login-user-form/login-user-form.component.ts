import { Component, OnInit, Input } from '@angular/core';

// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Linked with registration-form-component
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginUserService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user-form',
  templateUrl: './login-user-form.component.html',
  styleUrls: ['./login-user-form.component.scss'],
})
export class LoginUserFormComponent implements OnInit {
  @Input() userData = { username: "", password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router
  ) { }

  ngOnInit() : void {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser() : void{
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      console.log(result);
      // Logic for a successful user login goes here
         this.dialogRef.close(); // This will close the modal on success
         this.snackBar.open(result, 'OK', {
            duration: 2000
         });
        }, (result) => {
          this.snackBar.open('User Login successful', 'OK', {
            duration: 2000
          });
          localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);
        });
      }
}
