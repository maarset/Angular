import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { Complaint } from '../../Models/complaint';   //importing complaint.ts custom object. Don't have to use app.module.ts
import { User } from '../../Models/user';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { County } from '../../Models/county';
import { Priority } from '../../Models/priority';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.scss']
})



export class ComplaintFormComponent implements OnInit {
  
  @Input() complaint: Complaint;

  counties;
  categories;
  MessageClient: string;
  model:Complaint;
  name:string;
  phone:string;
  countyCode:string;
  address:string;
  city:string;
  state:string;
  zip:string;
  voted:number;
  language:string;
  categoryID:number;
  detailedMessage:string;
  takenBy:string;
  reviewedBy:string;
  stationNumber:string;

  //message: string = "Hola Mundo!"

  //This will change to boolean
  //@Output() messageEvent = new EventEmitter<boolean>(); 

  
  constructor(private http: HttpClient) { }

  
  ngOnInit() {
    this.counties = this.GetCountyList();
    this.categories = this.GetCategoriesList();
    if (this.complaint == null)
    {
      this.model = new Complaint(0,2,'','N','',null,0,'','','','','','','','','','','','','','','','',0,'','',0,'','','','','','',0);
    }
    else
    {
      this.model = this.complaint;
    }
   // console.log('Current Complaint ID = '+this.ComplaintID);
  }

  GetCategoriesList()
  {
   // this.http.get<County[]>('http://localhost:55211/api/Category/get').subscribe(data => {
    this.http.get<County[]>('http://localhost:55211/api/Category/').subscribe(data => {
      console.log(data);
      this.categories = data;
      },
        error => this.MessageClient
      );
   }
  
   GetPriorityList()
   {
    this.http.get<Priority[]>('http://localhost:55211/api/Priority/').subscribe(data => {
      console.log(data);
      this.categories = data;
      },
        error => this.MessageClient
      );
   }

  GetCountyList() 
  {
   this.http.get<County[]>('http://localhost:55211/api/County/').subscribe(data => {
   console.log(data);
   this.counties = data;
  },
  error => this.MessageClient
  );
  }

//TODO Pass boolean instead of string DUH
  closeForm() {
    //this.message='close';
    //this.messageEvent.emit(false)
    
  }

  LoadComplaint(id:number)
  {
    console.log(id);
    
    this.http.get<Complaint>('http://localhost:55211/api/Complaint/GetComplaint?ComplaintID='+id).subscribe(data => {
  
      var _complaint  = new Complaint( data.complaintID, data.electionID, data.complaintNumber, data.statusCode,
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

          //this.ObjComplaintList.push(_complaint);
         
         
        

    //console.log(this.currentPageSize);  
    },
    error => this.MessageClient
  );

  }
   
  AddComplaint()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
   
    this.http.post< Complaint >("http://localhost:55211/api/Complaints/",
    {
      "actionMessage": this.model.actionMessage,
      "address": this.model.address,
      "assignedDate": "", 
      "assignedStaff": "",
      "assignedStaffUID": "",
      "categoryID": this.model.categoryID,
      "city": this.model.city,
      "complaintID": "0",
      "complaintNumSeq": "0",  //Need to figure this one out. Huge sequence of all records
      "complaintNumber": "",
      "countyCode": this.model.countyCode,
      "createdDate": new Date().toLocaleString().replace(',',' '),
      "detailedMessage": this.model.detailedMessage,
      "electionID": "14",  //Need to figure out how to populate this
      "faxComments": "",
      "language": this.model.language,  //Language is always English
      "name": this.model.name, 
      "phone": this.model.phone,
      "priorityID": 0 ,   // Had a string here and should have been a Int 
      "resolvedDate": "", 
      "reviewedBy": this.model.reviewedBy,
      "stateCode": this.model.stateCode, 
      "stationNumber": this.model.stationNumber, 
      "statusCode": "N",
      "takenBy": this.model.takenBy, 
      "voted": this.model.voted,
      "zip": this.model.zip 
    },httpOptions)
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
}



  
  

  AddComplaint_OLD()
  {
//    var MyComplaint = new Complaint(0,2,'','C','SAC',11,0,'','','Mike Aarset','','','','CA','95765','NickYu','007','This is some text','','','6-6-2018','','',0,'',0,'English',1);
    //console.log('Adding Complaint' + MyComplaint.name);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    console.log('MODEL:' + this.model);
    //this.http.post< Complaint >('http://localhost:55211/api/Complaint/post',{
      this.http.post< Complaint >('http://localhost:55211/api/Complaints/',{
      "actionMessage": this.model.actionMessage,
      "address": this.model.address, 
      "assignedDate": "", 
      "assignedStaff": "",
      "assignedStaffUID": "",
      "categoryID": this.model.categoryID,
      "city": this.model.city,
      "complaintID": "0",
      "complaintNumSeq": "0",  //Need to figure this one out. Huge sequence of all records
      "complaintNumber": "",
      "countyCode": this.model.countyCode,
      "createdDate": new Date().toLocaleString().replace(',',' '),
      "detailedMessage": this.model.detailedMessage, 
      "electionID": "14",  //Need to figure out how to populate this
      "faxComments": "",
      "language": this.model.language,  //Language is always English
      "name": this.model.name, 
      "phone": this.model.phone, 
      "priorityID": "" , 
      "resolvedDate": "", 
      "reviewedBy": this.model.reviewedBy,
      "stateCode": this.model.stateCode, 
      "stationNumber": this.model.stationNumber, 
      "statusCode": "N",
      "takenBy": this.model.takenBy, 
      "voted": this.model.voted,
      "zip": this.model.zip 
 }).subscribe(
      res => {
        console.log(res);
      },
      err => { 
        console.log("Error occured");
      }
    );
    //This will change to boolean
    //this.message='close';
    //this.messageEvent.emit(this.model)
    //alert('Message Added for ' + this.model.name);
    this.closeForm();
  }
/*
  UpdateComplaint()
  {
//    var MyComplaint = new Complaint(0,2,'','C','SAC',11,0,'','','Mike Aarset','','','','CA','95765','NickYu','007','This is some text','','','6-6-2018','','',0,'',0,'English',1);
    //console.log('Adding Complaint' + MyComplaint.name);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    
    this.http.put< Complaint >('http://localhost:60217/Complaint/put',{
      "complaintID": this.model.complaintID,
      //"electionID": "2",  //Need to figure out how to populate this
      //"complaintNumber": "",
      "statusCode": this.model.statusCode,
      "countyCode": this.model.countyCode,
      "categoryID": this.model.categoryID,
       "priorityID": this.model.priorityID , 
       "assignedStaffUID": this.model.assignedStaffUID,
       //"assignedStaff": "", 
       "name": this.model.name, 
       "phone": this.model.phone, 
       "address": this.model.address, 
       "city": this.model.city,  
       "stateCode": this.model.stateCode, 
       "zip": this.model.zip, 
       "takenBy": this.model.takenBy, 
       "stationNumber": this.model.stationNumber, 
       "detailedMessage": this.model.detailedMessage, 
       "actionMessage": this.model.actionMessage, 
       "faxComments": this.model.faxComments, 
       //"createdDate": new Date().toLocaleString().replace(',',' '), 
       "assignedDate": this.model.assignedDate, 
       "resolvedDate": this.model.resolvedDate, 
       //"complaintNumSeq": "0",  //Need to figure this one out. Huge sequence of all records
       "reviewedBy": this.model.reviewedBy,
       //"rowsReturned": "0", 
       "language": this.model.language,  //Language is always English
       "voted": this.model.voted
 }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );
    //This will change to boolean
    this.message='close';
    this.messageEvent.emit(this.model)
  }
  */
}
