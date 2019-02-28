import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SearchModule { }



  export interface Search {
      Title: string;
      Year: string;
      imdbID: string;
      Type: string;
      Poster: string;
  }

  export interface RootObject {
      Search: Search[];
      totalResults: string;
      Response: string;
  }


