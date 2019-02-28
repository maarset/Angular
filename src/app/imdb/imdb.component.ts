import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { get } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../Models/Movie';   //importing movie.ts custom object. Don't have to use app.module.ts
//import { Search } from '../search';
import { SearchModule }  from '../search/search.module';


@Component({
  selector: 'app-imdb',
  templateUrl: './imdb.component.html',
  styleUrls: ['./imdb.component.scss']
})
export class ImdbComponent implements OnInit {
  TitleText: string;
  MessageClient: string;
  btnTitleText: string = 'Search';
  pageNum: string;
  pageList: number[] = [1,2,3,4,5];
  Ratings: string[] = [];
  ObjMovieList:Movie[] = [];
  ObjMovieListSelected:Movie[] = [];
  movieInsert: Movie[] = [];
  MovieDisplay: Movie;
  MovieCount: number;
  currentPage: number = 1;
  currentPageSize: number = 0;
  public movieCount: number;
  MaxLoop: number = 1;
  private mdlSampleIsOpen : boolean = false; // For Modal

  constructor(private http: HttpClient) { }

  

  GetMovieByID(MovieIN:Movie,open : boolean)
  {
    this.ObjMovieListSelected = [];
    this.MovieDisplay = MovieIN;

    //http://www.omdbapi.com/?i=tt0088944&apikey=39261c6a
    this.http.get<Movie>('http://www.omdbapi.com/?apikey=39261c6a&i='+this.MovieDisplay.imdbID).subscribe(data => {
      console.log(data);
      console.log(data.Released);
      MovieIN.Actors = data.Actors;
      MovieIN.Plot = data.Plot;
    });
    
    //console.log('COmplaint=' + JSON.stringify(complaintIN);
    this.ObjMovieListSelected.push(this.MovieDisplay);
   //alert( JSON.stringify(this.ObjComplaintListSelected[0]) )
   console.log('Movie=' + JSON.stringify(this.ObjMovieListSelected[0]));
   this.mdlSampleIsOpen = open;
  }

  
  private openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
}

  SearchMoviesByTitle()
  {
    this.movieInsert = [];
    this.ObjMovieList.length = 0;
    this.MovieCount = 0;
    this.pageNum = (<HTMLTextAreaElement>event.target).value;
    console.log(this.pageNum);
    if(this.pageNum == '>')
    {
      this.currentPage = this.currentPage + 1;
    }
    else if (this.pageNum == '<')
    {
      this.currentPage = this.currentPage - 1;
    }
    else
    {
      this.currentPage = Number( (<HTMLTextAreaElement>event.target).value);
    }
     if (!Number.isFinite ( this.currentPage) || (this.currentPage == 0) )
    {
      this.currentPage = 1;
    }
    console.log(this.currentPage);
    console.log((<HTMLTextAreaElement>event.target).value);
    this.ObjMovieList = [];
    this.pageNum = (<HTMLTextAreaElement>event.target).value;
    this.TitleText = this.TitleText.replace(' ','+');
    console.log('http://www.omdbapi.com/?apikey=39261c6a&s='+this.TitleText+'&page='+this.currentPage);
          this.http.get('http://www.omdbapi.com/?apikey=39261c6a&s='+this.TitleText+'&page='+this.currentPage).subscribe(data => {
        
        console.log( data );
        console.log(data['Response']);
        //if (data['Ratings'][2] != null)

        this.movieCount = data['totalResults'];
        console.log('movieCount = ' + this.movieCount);
        console.log('currentPage = ' + this.currentPage);
        //So if the json is returning over 100 records then we return the first one because it is probably an exact match
        if (this.movieCount > 500)
        {
          //this.MessageClient = 'Too Many Results ' + this.movieCount;
          this.currentPageSize = 0;
          var _movie = new Movie();
          _movie.ID = i;
          _movie.Title = data['Search'][0].Title;
          _movie.Year = data['Search'][0].Year; 
          _movie.imdbID = data['Search'][0].imdbID;
          _movie.Poster = data['Search'][0].Poster;
        
          //console.log(i);
          this.ObjMovieList.push(_movie);
        }
        else if (data['Search'] == null)
        {
          this.MessageClient = 'No Movie Found ' ;
        }
        else
        {
          this.MessageClient = '';
          this.pageList = [];
          for (var p = 1; p <= this.movieCount / 10; p++)
          {
            this.pageList.push(p); 
          }
          if (this.movieCount <= 10) //If total results from json is less than 10 then no paging
          {
            this.MaxLoop = this.movieCount;
          }
          else if (this.currentPage * 10 > this.movieCount)
          {
            this.MaxLoop = this.movieCount % 10;
            console.log('MOD LOOP = ' + this.MaxLoop);
          }
          else
          {
            this.MaxLoop =  10;
          }
          //if (this.currentPage > this.MaxLoop) //So say if results is 83 then once we get to page 9 then the for loop below just loops 3 items
          //{
          //  this.MaxLoop = this.movieCount % 10;
          //  console.log('MOD LOOP = ' + this.MaxLoop);
          //}
          console.log('MaxLoop = ' + this.MaxLoop );
          console.log(data);
          
          for(var i = 0; i < this.MaxLoop; i++)
          {
            
          var _movie = new Movie();
          _movie.ID = i;
          _movie.Title = data['Search'][i].Title;
          _movie.Year = data['Search'][i].Year; 
          _movie.imdbID = data['Search'][i].imdbID;
          _movie.Poster = data['Search'][i].Poster;
          /*
          _movie.Title =  (<Movie[]>data)[i].Title;
          _movie.Year =   (<Movie[]>data)[i].Year; 
          _movie.imdbID = (<Movie[]>data)[i].imdbID;
          _movie.Poster = (<Movie[]>data)[i].Poster;
          */
          //console.log(i);
          this.ObjMovieList.push(_movie);
          }
          this.currentPageSize = i;
          console.log('currentPageSize = ' + this.currentPageSize);
      }
        

  },
  error => this.MessageClient
);

  }

  ngOnInit() : void{

    


  }

}
