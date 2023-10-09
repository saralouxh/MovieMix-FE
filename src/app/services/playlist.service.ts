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
  playlistMoviesSubject: Subject<any> = new Subject();
  usersPlaylistsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    ) { }

  fetchAllPlaylists(){
    console.log('fetching all playlists')
    return this.http.get(`${URL}/playlists`).pipe(
      tap((data) => {
        console.log('Playlists received:', data); // Add this line
      })
    );
  }

  fetchSinglePlaylist(id:any){
    return this.http.get(`${URL}/playlists/${id}`)
  }


  onDeleteMovie(movieId: any, playlistId: any){
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.delete(`${URL}/playlists/${playlistId}/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  }

  onAddMovie(movie: any, playlistId: any) {
    return new Observable((observer) => {
      this.fetchSinglePlaylist(playlistId).subscribe((playlist: any) => {
        if (!playlist.movies) {
          playlist.movies = []; // Initialize the 'movies' property as an array
        }
        playlist.movies.push(movie);
        this.playlistMoviesSubject.next(playlist);
        console.log(movie)
        const token = JSON.parse(localStorage.getItem('token'));
        this.http
          .post(
            `${URL}/playlists/${playlistId}/movies`,
            { movie },
            {
              headers: {
                Authorization: `Bearer ${token.value}`,
              },
            }
          )
          .subscribe(
            (res) => {
              observer.next(res);
              observer.complete();
              console.log(res);
            },
            (error) => {
              observer.error(error);
            }
          );
      });
    });
  }

  createUserPlaylist(name: any){
    const token = JSON.parse(localStorage.getItem('token'));

    return this.http.post(
      `${URL}/playlists`,
      {name},
    );
  }

  deletePlaylist(id: any){
    const token = JSON.parse(localStorage.getItem('token'));
    return this.http.delete(`${URL}/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  }


}
