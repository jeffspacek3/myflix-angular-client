import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];
  username: string = '';

  constructor(
    public fetchUsers: ProfileComponent,
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  ngOnInit(): void {
  }
}
