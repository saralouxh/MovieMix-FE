import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';
import { MatDialog } from '@angular/material/dialog';
import { NewPlaylistModalComponent } from '../shared/new-playlist-modal/new-playlist-modal.component';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent implements OnInit {
  movies: any = [];
  playlists: any[] = [];
  user_id: any;
 
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '84e214a16bmsh62e376ebec92bc7p1c0eefjsn475fec7db90b',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'  
    });
  
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['q'];
      this.http.get<any>(`https://online-movie-database.p.rapidapi.com/title/find?q=${searchTerm}`, {
        headers: headers
      }).subscribe(data => {
        console.log(data);
        this.movies = data.results.map((movie) => {
          const image = movie.image ? movie.image.url : null;
          const title = movie.title;
          return { ...movie, image, title };
        });
      });
    });
  }


  onAddMovie(movie: any, playlistId: any){
    this.playlistService.onAddMovie(movie, playlistId).subscribe((res) => {
      console.log(res);
    });
  }

  openNewPlaylistModal(){
    const dialogRef = this.dialog.open(NewPlaylistModalComponent, {
      width: '300px',
    });
  }

}
