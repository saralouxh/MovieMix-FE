import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-all-playlists',
  templateUrl: './all-playlists.component.html',
  styleUrls: ['./all-playlists.component.css']
})
export class AllPlaylistsComponent implements OnInit {
  allPlaylists$: Observable<any>;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistService.fetchAllPlaylists().subscribe((res: any) => {
      this.allPlaylists$ = res.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    });
  }

}
