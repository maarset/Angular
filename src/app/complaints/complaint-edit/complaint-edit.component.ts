import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { Complaint } from '../../Models/complaint';   //importing complaint.ts custom object. Don't have to use app.module.ts
import { User } from '../../Models/user';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import {CommonModule} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { County } from '../../Models/county';
import { Status } from '../../Models/status';
import { Priority } from '../../Models/priority';
import { Category } from '../../Models/category';

import 'rxjs/Rx';

@Component({
  selector: 'app-complaint-edit',
  templateUrl: './complaint-edit.component.html',
  styleUrls: ['./complaint-edit.component.scss']
})
export class ComplaintEditComponent implements OnInit {
  public MessageClient: string;
  
 
  model:Complaint;
  selectedComplaint:Complaint;
  counties; //pulldown for counties
  users;   //pulldown for staff
  statuses; //pulldown for status
  priorities; //pulldown for priorities
  categories;

  message: string = "Hola Mundo!"

  //This will change to boolean

  @Output() messageEvent = new EventEmitter<boolean>();
  @Input() childMessage: number;
  


  constructor(private http: HttpClient) { 
    console.log('CONSTRUCTOR');
   
  }

 ngOnChanges() {
  console.log('ngOnChanges' + this.childMessage);
  
 }

  ngOnInit() {
    console.log('ngOnInit' + this.childMessage);
    this.categories = this.GetCategoriesList();
    this.counties = this.GetCountyList();
    this.users = this.GetUserList();
    this.statuses = this.GetStatusList();
    this.priorities = this.GetPriorityList();
    
    this.LoadComplaint(this.childMessage);

   // this.model = new Complaint(0,2,'','N','',null,0,'','','','','','','','','','','','','','','','',0,'','',0,'','','','','','',0);
  }

  closeForm() {
    this.message='close';
    this.messageEvent.emit(false)
    
  }

  GetCategoriesList()
  {
   // this.http.get<County[]>('http://localhost:55211/api/Category/get').subscribe(data => {
    this.http.get<Category[]>('http://localhost:55211/api/Category/').subscribe(data => {
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
      this.priorities = data;
      },
        error => this.MessageClient
      );
   }

   
  GetUserList()
  {
    this.http.get<User[]>('http://localhost:55211/api/Staff/').subscribe(data => {
    console.log('USER DATA = ' + data);
    this.users = data;
    },
    error => this.MessageClient
    );
  }

  GetCountyList() 
  {
    this.http.get<County[]>('http://localhost:55211/api/County/').subscribe(data => {
    console.log('GETTING COUNTY DATA');
    console.log(data);
    this.counties = data;
    },
    error => this.MessageClient 
    );
  }

  GetStatusList()
  {
    this.http.get<Status[]> ('http://localhost:55211/api/Status').subscribe(data => {
      console.log('GETTING STATUS DATA');
      console.log(data);
      this.statuses = data;
  },
  error => this.MessageClient
  );
    
  }

  private LoadComplaint(id:number) 
  {
    console.log(id);
    
    
    console.log('http://localhost:55211/Complaint/GetComplaint?ComplaintID='+id);
    this.http.get<Complaint>('http://localhost:55211/api/Complaints/'+id).subscribe(data => {
  console.log(data);
  this.model  = new Complaint( data.complaintID, data.electionID, data.complaintNumber, data.statusCode,
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
   // this.selectedComplaint = _complaint;
   //console.log(this.model.name);
  }

  


}
