import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {
  movies: any[] = [];
  users: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchMovies: MovieInfoComponent,
    public fetchUsers: ProfileComponent,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  showLeftArrow: boolean = false;
  showRightArrow: boolean = true;

  scroll(direction: number): void {
    const container = document.querySelector('.movie-grid');
    if (container) {
      const scrollAmount = direction * 300;
      container.scrollLeft += scrollAmount;

      this.updateArrowVisibility(container);
    }
  }
  updateArrowVisibility(container: any): void {
    // Show/hide left arrow
    this.showLeftArrow = container.scrollLeft > 0;

    // Show/hide right arrow
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    this.showRightArrow = container.scrollLeft < maxScrollLeft;
  }


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res) => {
        this.movies = res;

        let user = JSON.parse(localStorage.getItem('user') || '');
        this.movies.forEach((movie: any) => {
          movie.isFavorite = user.favoriteMovies.includes(movie._id);
        });
        return this.movies;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  redirectProfile(): void {
}
logout(): void {
}

  /**
   * Opens a dialog to display movie synopsis.
   * @param movie - The movie object.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { movie }, // Pass the movie object to the dialog
      width: '600px',
    });
  }
  /**
   * Opens a dialog to display director information.
   * @param movie - The movie object.
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { directorName: movie.Director },
      width: '600px',
    });
  }
  

}
