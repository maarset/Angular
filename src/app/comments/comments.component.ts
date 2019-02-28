import { Component, OnInit } from '@angular/core';
import { get } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import { Complaint } from '../Models/complaint';   //importing complaint.ts custom object. Don't have to use app.module.ts



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  JSONurl: string = 'http://localhost:55211/api/Complaints'; 
  JSONComplaintNumber: string;
  JSONComplaintID: string;
  complaints = [];
  //complaintsMulti = [5][2];
  public complaintCount: number = 0;

   
  //public ObjComplaintList: Complaint[] = [];
  ObjComplaintList:Complaint[] = [];
 
  constructor(private http: HttpClient) { }
  
  ngOnInit() : void {
//TODO: No longer a valid service
    this.http.get('http://localhost:55211/api/Complaints').subscribe(data => {
        
    for(var i = 0; i < 10; i++)
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
      data[0].language,
      data[0].voted,
      data[i].namePoll,
      data[i].addressPoll,
      data[i].cityPoll,
      data[i].stateCodePoll,
      data[i].zipPoll,
      data[i].email,
      data[i].rowsReturned
     );
      console.log(_complaint.complaintID);
      this.complaintCount = i;
      console.log(i);
      this.ObjComplaintList.push(_complaint);

      }

    
    });
    
  }

  

}
