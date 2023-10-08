import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search-movie', component: SearchMovieComponent },
  { path: 'playlist-detail/:id', component: PlaylistDetailComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
