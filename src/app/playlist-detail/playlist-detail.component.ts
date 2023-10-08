import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css'],
})
export class PlaylistDetailComponent implements OnInit {
  playlist: any = null;
  playlistMovies: any = [];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const playlistId = params['id'];

      this.playlistService.fetchSinglePlaylist(playlistId).subscribe({
        next: (res: any) => {
          this.playlist = res.payload.playlist;
          this.playlistMovies = this.playlist.movies; 
          console.log(this.playlistMovies);
        },
      });
    });
  }

  getMoviesInPlaylist(playlistId) {
    this.playlistService.fetchSinglePlaylist(playlistId).subscribe({
      next: (res: any) => {
        this.playlistMovies = res.payload.playlist.movies;
        console.log(this.playlistMovies);
      },
    });
  }

  deleteMovie(movieId: any){
    this.playlistService.onDeleteMovie(movieId, this.playlist.id).subscribe((res)=>{
      console.log(res);
      this.getMoviesInPlaylist(this.playlist.id);
    });
  }

  onDeletePlaylist(playlistId){
    this.playlistService.deletePlaylist(playlistId).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/user-playlists']); // Navigate to the user-playlists page
    })
  }

}
