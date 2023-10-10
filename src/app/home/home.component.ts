import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewPlaylistModalComponent } from '../shared/new-playlist-modal/new-playlist-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any[];
  playlists: any[] = [];
  // user_id: any;

  constructor(
    private http: HttpClient, 
    private dialog: MatDialog, 
    private playlistService: PlaylistService,
  ) {}

  ngOnInit() {
    // API Call
		const headers = new HttpHeaders( {
      'X-RapidAPI-Key': '84e214a16bmsh62e376ebec92bc7p1c0eefjsn475fec7db90b',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    });
		this.http
			.get<any>('https://imdb-top-100-movies.p.rapidapi.com', {
				headers: headers
			})
			.subscribe(data => {
        console.log(data);
        this.movies = data.map((movie) => {
          const image = movie.image || null;
          const title = movie.title;
          return { ...movie, image, title };
        });
        this.shuffleArray(this.movies);
    });
    
  
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  openNewPlaylistModal(){
    const dialogRef = this.dialog.open(NewPlaylistModalComponent, {
      width: '300px',
    });
  }

  addMovieToPlaylist(movie: any, playlistId: any){
    this.playlistService.addMovieToPlaylist(movie, playlistId).subscribe((res) => {
      console.log(res);
    });
  }
 
}