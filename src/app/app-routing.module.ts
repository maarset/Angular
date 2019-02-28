import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { CommentsComponent } from './comments/comments.component';
import { ImdbComponent } from './imdb/imdb.component';

import { County } from './Models/county';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'comments',
    component: CommentsComponent
  },
  {
    path: 'complaints',
    component: ComplaintsComponent
  },
  {
    path: 'imdb',
    component: ImdbComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
