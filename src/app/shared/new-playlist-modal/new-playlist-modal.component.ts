import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-new-playlist-modal',
  templateUrl: './new-playlist-modal.component.html',
  styleUrls: ['./new-playlist-modal.component.css']
})
export class NewPlaylistModalComponent implements OnInit {
  name: string;

  createPlaylistForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private playlistService: PlaylistService, 
    private router: Router,
    private dialogRef: MatDialogRef<NewPlaylistModalComponent>
    ) { }

  ngOnInit(): void {
  }
  
  onSavePlaylist() {
    const newPlaylist = this.createPlaylistForm.value.name;

    this.playlistService.createPlaylist(newPlaylist).subscribe((res: any) => {
      console.log(res)
    });
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }

  onCancel(){
    this.dialogRef.close();
  }
}
