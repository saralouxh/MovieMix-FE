import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-all-playlists',
  templateUrl: './all-playlists.component.html',
  styleUrls: ['./all-playlists.component.css']
})
export class AllPlaylistsComponent implements OnInit {
  allPlaylists: any = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistService.fetchAllPlaylists().subscribe((res: any) => {
      if (res.success) {
        this.allPlaylists = res.payload.playlists;
        console.log(this.allPlaylists)
      }
    });
  }

}
