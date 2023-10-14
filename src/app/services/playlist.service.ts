import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient, 
    ) { }

  fetchAllPlaylists(){
    return this.http.get(`${this.apiUrl}/playlists`);
  }

  fetchPlaylistMovies(id:any){
    return this.http.get(`${this.apiUrl}/playlists/${id}/movies`)
  }

  fetchSinglePlaylist(id: any){
    return this.http.get(`${this.apiUrl}/playlists/${id}`);
  }

  createPlaylist(name: any){
    return this.http.post(`${this.apiUrl}/playlists`, {name});
  }

  addMovieToPlaylist(movie: any, playlistId: any) {
    const trimmedMovieData = {
      title: movie.title,
      image: movie.image,
    };
  
    return this.http.post(`${this.apiUrl}/playlists/${playlistId}/add_movie`, trimmedMovieData).pipe(
      tap((response) => {
        console.log('Response:', response);
      })
    );
  }

  onDeleteMovie(playlistId: any, movieId: any){
    return this.http.delete(`${this.apiUrl}/playlists/${playlistId}/remove_movie?movie_id=${movieId}`);
  }

  deletePlaylist(playlistId: any){
    return this.http.delete(`${this.apiUrl}/playlists/${playlistId}`);
  }

}
