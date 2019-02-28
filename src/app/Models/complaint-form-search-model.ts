import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
export class ComplaintFormModel {

    startDate:NgbDateStruct;  //Form Search Parameter
    endDate:NgbDateStruct;    //Form Search Parameter
    county:string;     //Form Search Parameter
    username:string;   //Form Search Parameter
    sort:string;      //
    currentPage:number; //The Current Result Page when results are shown
    //navPrev:string;
    //navNext:string;
    rowsReturned:number; //Total number of records returned from API for a distinct Search
    pageCount:number;    //Total number of Pages returned from distinct search. rowsReturned/10
    currentPageSize: number; 
    constructor(StartDate:NgbDateStruct,EndDate:NgbDateStruct,County:string,Username:string,Sort:string,CurrentPage:number,RowsReturned:number,PageCount:number,CurrentPageSize:number)
    {
        this.startDate=StartDate;
        this.endDate=EndDate;
        this.county=County;
        this.username=Username;
        this.sort= Sort;
        this.currentPage=CurrentPage;
        //this.navPrev = NavPrev;
        //this.navNext = NavNext;
        this.rowsReturned = RowsReturned;
        this.pageCount = PageCount;
        this.currentPageSize = CurrentPageSize;
    }

} 
