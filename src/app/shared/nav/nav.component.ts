import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewPlaylistModalComponent } from '../new-playlist-modal/new-playlist-modal.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchForm = new FormGroup({
    movieTitle: new FormControl(''),
  });

  constructor(
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
   
  }

  onSearchMovie(){
    const searchTerm = this.searchForm.get('movieTitle').value;
    this.router.navigate(['/search-movie'], { queryParams: { q: searchTerm } } );
  }

  openNewPlaylistModal(){
    const dialogRef = this.dialog.open(NewPlaylistModalComponent, {
      width: '300px',
    });
  }

}
