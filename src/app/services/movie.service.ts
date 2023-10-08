import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PlaylistService } from './playlist.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: any = [];
  selectedMovie: any = null;
  currentUserPlaylist: any = { movies: []};
  currentPlaylistMoviesSubject: Subject<any> = new Subject();
 
  constructor(private http: HttpClient, private playlistService: PlaylistService) { }

  getMoviesFromAPI(searchTerm: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '84e214a16bmsh62e376ebec92bc7p1c0eefjsn475fec7db90b',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'  
    });

    return this.http.get<any>(`https://online-movie-database.p.rapidapi.com/title/find?q=${searchTerm}`, {
      headers: headers
    });

  }
  
}
