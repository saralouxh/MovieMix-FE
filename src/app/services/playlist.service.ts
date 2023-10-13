import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  // private playlists$ = new BehaviorSubject<any[]>([]);
  // playlistMoviesSubject: Subject<any> = new Subject();
  // usersPlaylistsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    ) { }

  
  fetchAllPlaylists(){
    return this.http.get(`${URL}/playlists`);
  }

  fetchPlaylistMovies(id:any){
    return this.http.get(`${URL}/playlists/${id}/movies`)
  }

  fetchSinglePlaylist(id: any){
    return this.http.get(`${URL}/playlists/${id}`);
  }

  createPlaylist(name: any){
    return this.http.post(`${URL}/playlists`, {name});
  }

  addMovieToPlaylist(movie: any, playlistId: any) {
    const trimmedMovieData = {
      title: movie.title,
      image: movie.image,
    };
  
    return this.http.post(`${URL}/playlists/${playlistId}/add_movie`, trimmedMovieData).pipe(
      tap((response) => {
        console.log('Response:', response);
      })
    );
  }

  onDeleteMovie(playlistId: any, movieId: any){
    return this.http.delete(`${URL}/playlists/${playlistId}/remove_movie?movie_id=${movieId}`);
  }

  deletePlaylist(playlistId: any){
    return this.http.delete(`${URL}/playlists/${playlistId}`);
  }

}
