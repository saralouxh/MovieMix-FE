import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css'],
})
export class PlaylistDetailComponent implements OnInit {
  playlist: any = '';
  playlistMovies: any = [];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const playlistId = params['id'];

        // Fetch the playlist details
        this.playlistService.fetchSinglePlaylist(playlistId).subscribe((res) => {
          this.playlist = res;
          console.log(this.playlist);
        });
  
        // Fetch the playlist movies
        this.playlistService.fetchPlaylistMovies(playlistId).subscribe((res) => {
          this.playlistMovies = res;
          console.log(this.playlistMovies);
        });
    });
  }

  deleteMovie(movieId: any){
    const playlistId = this.playlist.id; // Assuming you have a 'playlist' object with the current playlist details
    this.playlistService.onDeleteMovie(playlistId, movieId).subscribe(() => {
      // Refresh the playlist movies after deletion
      this.playlistService.fetchPlaylistMovies(playlistId).subscribe((res) => {
        this.playlistMovies = res;
        console.log('Movie deleted successfully');
      });
    });
  }

  onDeletePlaylist(){
    // this.playlistService.deletePlaylist(playlistId).subscribe((res) => {
    //   console.log(res);
    //   this.router.navigate(['/user-playlists']); // Navigate to the user-playlists page
    // })
  }

}
