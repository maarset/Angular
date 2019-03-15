import { Component,Input, OnInit,ViewChild, EventEmitter,Output  } from '@angular/core';
import { Complaint } from '../Models/complaint';   //importing complaint.ts custom object. Don't have to use app.module.ts
import { User } from '../Models/user';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Http, Response } from '@angular/http';
import {CommonModule} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import {throwError} from 'rxjs';
import { County } from '../Models/county';
import { Status } from '../Models/status';
import { Priority } from '../Models/priority';
import { Category } from '../Models/category';
import { ComplaintFormModel } from '../Models/complaint-form-search-model';
import { ComplaintsService } from '../Service/complaints.service';

//import { ComplaintEditComponent } from '../complaints/complaint-edit/complaint-edit.component'
import 'rxjs/Rx';


//TODO
//In Modal we need to actually display CategoryID text and PriorityID text instead of number 
//Category ID 17
//Priority ID 1

//TODO
//Clean up message sent from Child back to Parent for closing form for new Complaint

//TODO
//Write API for PUT (UPDATE)
// Tie in Complaint New form to do update too



@Component({
  selector: 'app-complaints',
 // selector: 'ngbd-datepicker-basic',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  providers: [ ComplaintsService]
})

export class ComplaintsComponent implements OnInit {
  
  @Output() complaintClicked = new EventEmitter<Complaint>();
  //public complaintCount: number = 0;
 // Service:ComplaintsService;
  model:ComplaintFormModel;
  //modelEdit:ComplaintEditComponent;
  ObjComplaintList:Complaint[] = [];
  ObjComplaintReturnList: Complaint[] = [];
  ObjComplaintListSelected: Complaint[] = [];
  ComplaintNew: Complaint;
  selectedComplaint: Complaint;
  selectedComplaintEdit: Complaint;
  msgChild:string;
  //Startmodel: NgbDateStruct;
  //Endmodel:NgbDateStruct;
  date: {year: number, month: number};
  
  public MessageClient: string;
  public ComplaintDisplay : Complaint;
  public ComplaintID : number;
  private mdlViewIsOpen : boolean = false; // For View Modal
  private mdlEditIsOpen : boolean = false; // For Edit Modal

  public newComplaintIsOpen : boolean = false; //New Complaint FOrm
  public editComplaintIsOpen : boolean = false; //Edit Complaint FOrm
  public hideSearchForm : boolean = false;
  public ComplaintResults : boolean = false; //Results Table of Complaints that were searched
  public SearchFormSubmitted : boolean = false;
  public parentMessage : number = 0;
  pageNum: string = '1'; // DOM input for pagenation (<HTMLTextAreaElement>event.target)
  url: string = ''; //URL for searching Complaints
  btnText: string = 'Search';
  btnTextComplaintFrm: string = 'Cancel New Complaint Form from Parent';
  public counties; //pulldown for counties
  public users;   //pulldown for staff
  public statuses; //pulldown for status
  public priorities; //pulldown for priorities
  public categories;
 //npm install --save rxjs-compat   // For compatibility
  //constructor(private http: HttpClient) { }
  //constructor(private service: ComplaintsService) { }
  constructor(private complaintService: ComplaintsService,private http: HttpClient) { }
 
 
  ngOnInit() {
    this.users = this.GetUserList();
    this.counties = this.GetCountyList();
    this.priorities =  this.GetPriorityList();
    this.statuses = this.GetStatusList();
    this.categories = this.GetCategoriesList();
    this.model = new ComplaintFormModel(null,null,'%27%27','%27%27',null,0,0,0,0);
   // StartDate:NgbDateStruct,EndDate:NgbDateStruct,County:string,Username:string,Sort:string,CurrentPage:number,NavPrev:string,NavNext:string,RowsReturned:number,PageCount:number,CurrentPageSize:number
  }
/*
  selectToday() {
    const now = new Date();
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
*/
/*
  receiveMessage($event) {
    this.ComplaintNew = $event;
    if ($event == false)
    {
      this.newComplaintIsOpen = false;
    }
    console.log('FROM CHILD IN PARENT = '+this.ComplaintNew.name);
  }
*/
  NewComplaint(complaint: Complaint)
  {
    this.complaintClicked.emit(complaint);
    console.log('complaintID = |' + complaint.complaintID + '|');
    this.newComplaintIsOpen = true;
    this.hideSearchForm = true;
    if (complaint.complaintID == null)
    {
    this.model.rowsReturned = 0;
    }
  }

  EditComplaint(open:boolean,complaintID:number)
  {
    //this.model = this.LoadComplaint(complaintID);
    this.parentMessage = complaintID;
    this.editComplaintIsOpen = open;
    this.hideSearchForm = true;
    if (open)
    {
    this.model.rowsReturned = 0;
   
    }
  }

  NewSearch(open:boolean)
  {
    console.log(open);
    this.newComplaintIsOpen = false;
    if (open)
    {
    this.model.rowsReturned = 0;
    }
    this.model.startDate = null;
    this.model.endDate = null;
    this.model.county = null;
    this.model.username = null;

  }

  NewSearchSave(open:boolean)
  {
    console.log(open);
    this.newComplaintIsOpen = false;
    if (open)
    {
    this.model.rowsReturned = 0;
    }
  

  }

  GetCategoriesList()
  {
    this.http.get<Category[]>('http://localhost:55211/api/Category/').subscribe(data => {this.categories = data;});
   }

   GetPriorityList()
   {
    this.http.get<Priority[]>('http://localhost:55211/api/Priority/').subscribe(data => {this.priorities = data;});
   }

  LoadComplaint(id:number)
  {
    console.log(id);
    
    this.newComplaintIsOpen = true;
    this.openModalView(false);
    console.log('http://localhost:55211/Complaint/GetComplaint?ComplaintID='+id);
    this.http.get<Complaint>('http://localhost:55211/Complaint/GetComplaint?ComplaintID='+id).subscribe(data => {
  console.log(data);
      this.selectedComplaint  = new Complaint( data.complaintID, data.electionID, data.complaintNumber, data.statusCode,
          data.countyCode, data.categoryID, data.priorityID, data.assignedStaffUID, data.assignedStaff, data.name,
          data.phone, data.address, data.city, data.stateCode, data.zip, data.takenBy,
          data.stationNumber,
          data.detailedMessage,
          data.actionMessage,
          data.faxComments,
          data.createdDate,
          data.assignedDate,
          data.resolvedDate,
          data.complaintNumSeq,
          data.reviewedBy,
      
          data.language,
          data.voted,
          data.namePoll,
      data.addressPoll,
      data.cityPoll,
      data.stateCodePoll,
      data.zipPoll,
      data.email,
      data.rowsReturned
          ); 
    },
    error => this.MessageClient
  );
   // this.selectedComplaint = _complaint;
   console.log(this.selectedComplaint.name);
  }

  

  GetUserList()
  {
    this.http.get<User[]>('http://localhost:55211/api/Staff/').subscribe(data => {this.users = data});
    //this.users = this.complaintService.GetUserList();
  }
 

  GetCountyList()
  {
    this.http.get<County[]>('http://localhost:55211/api/County/').subscribe(data =>{this.counties = data}); 
  }

  GetStatusList()
  {
    this.http.get<Status[]> ('http://localhost:55211/api/Status').subscribe(data => {this.statuses = data}); 
  }


  GetComplaintsByID(id:number)
  {
    this.http.get<County[]>('http://localhost:55211/api/Complaints/'+id).subscribe(data => {this.counties = data;});
  }
  
  getComplaintsByDateSort(sort:string)
  {
    this.model.sort = sort;
    this.pageNum = (<HTMLTextAreaElement>event.target).value;
    console.log('pageNum = ' + this.pageNum);
    this.GetComplaintsByDate();
  }
  
  GetComplaintsByDate()
  {
    this.SearchFormSubmitted = true;
    this.ObjComplaintListSelected = []; 
    this.ObjComplaintList.length = 0; //Clears displayed Complaint when new search is triggered
   // this.complaintCount = 0;
    this.pageNum = (<HTMLTextAreaElement>event.target).value;
    console.log(this.pageNum);
    if(this.pageNum.endsWith('>'))
    {
      this.model.currentPage = this.model.currentPage + 1;
    }
    else if (this.pageNum.endsWith('<'))
    {
      this.model.currentPage = this.model.currentPage - 1;
    }
    else
    {
      this.model.currentPage = Number( (<HTMLTextAreaElement>event.target).value);
    }
     if (!Number.isFinite ( this.model.currentPage) )  
    {
      this.model.currentPage = 1;
    }
    if (this.model.currentPage < 1)
    {
      this.model.currentPage = 1;
    }
    //For API call. county and username is not mandatory.
    if (this.model.county.length < 1)
    {
      this.model.county = "''";
    }
    if (this.model.username.length < 1)
    {
      this.model.username = "'NONE'";
    }
   console.log('START DATE = ' + this.model.startDate.month + '-'+this.model.startDate.day+'-'+this.model.startDate.year);
   console.log('END DATE = ' + this.model.endDate.month + '-'+this.model.endDate.day+'-'+this.model.endDate.year);
     
      //this.url = 'http://localhost:55211/api/Complaint/get?startdate='+this.model.startDate.month + '-'+this.model.startDate.day+'-'+this.model.startDate.year+'&enddate='+this.model.endDate.month + '-'+this.model.endDate.day+'-'+this.model.endDate.year+'&AssignedTo='+this.model.username+'&sort='+this.model.sort+'&CountyCode='+this.model.county+'&page='+this.model.currentPage; 
      this.url = 'http://localhost:55211/api/Complaints/'+this.model.startDate.month + '-'+this.model.startDate.day+'-'+this.model.startDate.year+'/'+this.model.endDate.month + '-'+this.model.endDate.day+'-'+this.model.endDate.year+'/'+this.model.username+'/'+this.model.county+'/'+this.model.currentPage; 
      console.log('THIS URL:' + this.url);
      this.http.get<Complaint[]>(this.url).subscribe(data => {
    this.model.rowsReturned = data[0].rowsReturned;
   console.log('data.length = ' + data.length);
   console.log('data.rowsReturned = ' + data[0].rowsReturned);
   if (data.length >= 1)
   {
          for(var i = 0; i < 10 ; i++)
          {
            var _complaint = new Complaint( 
            data[i].complaintID, 
            data[i].electionID, 
            data[i].complaintNumber, 
            data[i].statusCode,
            data[i].countyCode, 
            data[i].categoryID, 
            data[i].priorityID, 
            data[i].assignedStaffUID, 
            data[i].assignedStaff, 
            data[i].name,
            data[i].phone, 
            data[i].address, 
            data[i].city, 
            data[i].stateCode, 
            data[i].zip, 
            data[i].takenBy,
            data[i].stationNumber,
            data[i].detailedMessage,
            data[i].actionMessage,
            data[i].faxComments,
            data[i].createdDate,
            data[i].assignedDate,
            data[i].resolvedDate,
            data[i].complaintNumSeq,
            data[i].reviewedBy,
      
            data[i].language,
            data[i].voted,
            data[i].namePoll,
            data[i].addressPoll,
            data[i].cityPoll,
            data[i].stateCodePoll,
            data[i].zipPoll,
            data[i].email,
            data[i].rowsReturned 
            );
         
            this.ObjComplaintList.push(_complaint);
           
          this.model.currentPageSize = i; 
          }
        }
        else
        {
          data[i].rowsReturned = 0;
        }
      //console.log(this.currentPageSize);  
      },
      error => this.MessageClient
    );
  
  if (this.model.rowsReturned > 0)
  {
    this.ComplaintResults = true;
  }
  
  }
  //Main Modal to view complaint
  ViewComplaintModalByID(complaintIN:Complaint,open : boolean)
  {
    this.ComplaintDisplay = complaintIN;
    //console.log('COmplaint=' + JSON.stringify(complaintIN);
    this.ObjComplaintListSelected = [];
    this.ObjComplaintListSelected.push(this.ComplaintDisplay);
   
   //alert( JSON.stringify(this.ObjComplaintListSelected[0]) )
   console.log('COmplaint=' + JSON.stringify(this.ObjComplaintListSelected[0]));
   console.log(this.ObjComplaintListSelected.length);
   this.mdlViewIsOpen = open;
  
  }
//Main Modal to Edit Complaint
  EditComplaintModalByID(complaintIN:Complaint,open : boolean)
  {
    
    this.selectedComplaintEdit = complaintIN;
    this.categories = this.GetCategoriesList();
    this.users = this.GetUserList();
    this.statuses = this.GetStatusList();
    this.priorities = this.GetPriorityList();
    //this.ObjComplaintListSelected.push(this.ComplaintDisplay);
   
   //alert( JSON.stringify(this.ObjComplaintListSelected[0]) )
   console.log('COMPLAINT=' + JSON.stringify(complaintIN));
   console.log(this.ObjComplaintListSelected.length);
   this.mdlEditIsOpen = open;
  
  }

//I tested the WEB.API and it works.
//Blobs need to be trimmed.
//Some ints are coming to web.api as zero
  UpdateComplaint()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'cache-control': 'no-cache'
      })
    };
    console.log('COmplaintPUT=' + JSON.stringify(this.selectedComplaintEdit));
    //this.http.put< Complaint >("http://localhost:55211/api/Complaints/",
    this.http.put("http://localhost:55211/api/Complaints/",
    {
      "statusCode": this.selectedComplaintEdit.statusCode,
      "countyCode": this.selectedComplaintEdit.countyCode,
      "categoryID": this.selectedComplaintEdit.categoryID,
      "assignedStaffUID": this.selectedComplaintEdit.assignedStaffUID,
      "priorityID": this.selectedComplaintEdit.priorityID,
      "name": this.selectedComplaintEdit.name, 
      "phone": this.selectedComplaintEdit.phone,
      "address": this.selectedComplaintEdit.address,
      "city": this.selectedComplaintEdit.city,
      "stateCode": this.selectedComplaintEdit.stateCode, 
      "zip": this.selectedComplaintEdit.zip,
      "detailedMessage": this.selectedComplaintEdit.detailedMessage,
      "email": this.selectedComplaintEdit.email,
      "actionMessage": this.selectedComplaintEdit.actionMessage,
      "assignedDate": this.selectedComplaintEdit.assignedDate,
      "resolvedDate": this.selectedComplaintEdit.resolvedDate,
      "namePoll": this.selectedComplaintEdit.namePoll, 
      "addressPoll": this.selectedComplaintEdit.addressPoll,
      "cityPoll": this.selectedComplaintEdit.cityPoll,
      "stateCodePoll": this.selectedComplaintEdit.stateCodePoll, 
      "zipPoll": this.selectedComplaintEdit.zipPoll,
      "language": this.selectedComplaintEdit.language,  //Language is always English
      "voted": this.selectedComplaintEdit.voted       
    },httpOptions)
    .subscribe(
        (val) => {
            console.log("PUT call successful value returned in body", 
                        val);
        },
        response => {
            console.log("PUT call in error", response);
        },
        () => {
            console.log("The PUT observable is now completed.");
        });
        this.openModalEdit(false);
}

  private openModalView(open : boolean) : void 
  {
    this.mdlViewIsOpen = open;
  }

  private openModalEdit(open : boolean) : void 
  {
    this.mdlEditIsOpen = open;
  }

}

