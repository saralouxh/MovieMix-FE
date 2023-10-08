import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser: User = null;

  searchForm = new FormGroup({
    movieTitle: new FormControl(''),
  });

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
   
  }

  onSearchMovie(){
    const searchTerm = this.searchForm.get('movieTitle').value;
    this.router.navigate(['/search-movie'], { queryParams: { q: searchTerm } } );
  }

}
