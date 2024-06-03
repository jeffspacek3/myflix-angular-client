import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user-form',
  templateUrl: './login-user-form.component.html',
  styleUrls: ['./login-user-form.component.scss'],
})
export class LoginUserFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {
  }

  ngOnInit(): void {}

  
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(result => {
        console.log(result);
        localStorage.setItem('user', result.user.Username);
        localStorage.SetItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('User Login Successful', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'Not Ok', {
          duration: 2000,
        });
      }
    );
  }
}
