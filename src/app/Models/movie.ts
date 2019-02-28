/*
Free Movie JSON site
Here is your key: 39261c6a
http://www.omdbapi.com/?apikey=39261c6a&t=Starwars
*/
export class Movie {


    private _ID: number; //used by app for navigation
    private _Title: string;
    private _Year: string;
    private _Rated: string;
    private _Released: string;
    private _Runtime: string;
    private _Genre: string;
    private _Director: string;
    private _Writer: Writer[];
    private _Actors: string[];
    private _Plot: string;
    private _Language: string;
    private _Country: string;
    private _Awards: string;
    private _Poster: string;
    private _Ratings: Rating[];
    private _Metascore: string;
    private _imdbRating: string;
    private _imdbVotes: string;
    private _imdbID: string;
    private _Type: string;
    private _DVD: string;
    private _BoxOffice: string;
    private _Production: string;
    private _Website: string;
    private _Response: string;
    private _totalResults: number;

    get ID(): number {
        return this._ID;
    }
    set ID( newID: number) {
        this._ID = newID;
    }
    
    get Title(): string {
        return this._Title;
    }
    set Title( newTitle: string) {
        this._Title = newTitle;
    }

    get Year(): string {
        return this._Year;
    }
    set Year( newYear: string) {
        this._Year = newYear;
    }

    get Rated(): string {
        return this._Rated;
    }
    set Rated( newRated: string) {
        this._Rated = newRated;
    }

    get Released(): string {
        return this._Released;
    }
    set Released( newReleased: string) {
        this._Released = newReleased;
    }

    get Runtime(): string {
        return this._Runtime;
    }
    set Runtime( newRuntime: string) {
        this._Runtime = newRuntime;
    }

    get Genre(): string {
        return this._Genre;
    }
    set Genre( newGenre: string) {
        this._Genre = newGenre;
    }

    get Director(): string {
        return this._Director;
    }
    set Director( newDirector: string) {
        this._Director = newDirector;
    }

    get Writer(): Writer[] {
        return this._Writer;
    }
    set Writer( newWriter: Writer[]) {
        this._Writer = newWriter;
    }

    get Actors(): string[] {
        return this._Actors;
    }
    set Actors( newActors: string[]) {
        this._Actors = newActors;
    }

    get Plot(): string {
        return this._Plot;
    }
    set Plot( newPlot: string) {
        this._Plot = newPlot;
    }

    get Language(): string {
        return this._Language;
    }
    set Language( newLanguate: string) {
        this._Language = newLanguate;
    }

    get Country(): string {
        return this._Country;
    }
    set Country( newCountry: string) {
        this._Country = newCountry;
    }

    get Awards(): string {
        return this._Awards;
    }
    set Awards( newAwards: string) {
        this._Awards = newAwards;
    }

    get Poster(): string {
        return this._Poster;
    }
    set Poster( newPoster: string) {
        this._Poster = newPoster;
    }

    get Ratings(): Rating[] {
        return this._Ratings;
    }
    set Ratings( newRatings: Rating[]) {
        this._Ratings = newRatings;
    }

    get Metascore(): string {
        return this._Metascore;
    }
    set Metascore( newMetascore: string) {
        this._Metascore = newMetascore;
    }

    get imdbRating(): string {
        return this._imdbRating;
    }
    set imdbRating( newimdbRating: string) {
        this._imdbRating = newimdbRating;
    }

    get imdbVotes(): string {
        return this._imdbVotes;
    }
    set imdbVotes( newimdbVotes: string) {
        this._imdbVotes = newimdbVotes;
    }
    
    get imdbID(): string {
        return this._imdbID;
    }
    set imdbID( newimdbID: string) {
        this._imdbID = newimdbID;
    }

    get Type(): string {
        return this._Type;
    }
    set Type( newType: string) {
        this._Type = newType;
    }

    get DVD(): string {
        return this._DVD;
    }
    set DVD( newDVD: string) {
        this._DVD = newDVD;
    }

    get BoxOffice(): string {
        return this._BoxOffice;
    }
    set BoxOffice( newBoxOffice: string) {
        this._BoxOffice = newBoxOffice;
    }

    get Production(): string {
        return this._Production;
    }
    set Production( newProduction: string) {
        this._Production = newProduction;
    }

    get Website(): string {
        return this._Website;
    }
    set Website( newWebsite: string) {
        this._Website = newWebsite;
    }

    get Response(): string {
        return this._Response;
    }
    set Response( newResponse: string) {
        this._Response = newResponse;
    }

    get totalResults(): number {
        return this._totalResults;
    }
    set totalResults( newtotalResults: number) {
        this._totalResults = newtotalResults;
    }

    constructor() {}

}
     
    

// was trying some namespace spoofing there. Search is now in seperate file

     class Search extends Movie{
/*
        private _totalResults: number;

        get totalResults(): number {
            return this._totalResults;
        }
        set totalResults( newtotalResults: number) {
        this._totalResults = newtotalResults;
        }
        */
        constructor() {super()}
    }




    class Rating
    {
        private _Source: string;
        private _Value: string;
    }

    class Writer
    {
        private _Writer: string;
        private _Type: string;
    }

