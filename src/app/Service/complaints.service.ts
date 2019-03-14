import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Complaint } from '../Models/complaint';
import { County } from '../Models/county';
import { Status } from '../Models/status';
import { Priority } from '../Models/priority';
import { Category } from '../Models/category';
import { User } from '../Models/user';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor(private http: HttpClient) { }  

  public counties; //pulldown for counties
  public users;   //pulldown for staff
  public statuses; //pulldown for status
  public priorities; //pulldown for priorities
  public categories;

  public GetUserList(): User[]
  {
    this.http.get<User[]>('http://localhost:55211/api/Staff/').subscribe(data => {
    console.log(data);    
    this.users = data;
  } );
    
    return this.users;
  }
 
  GetCountyList()
  {
    this.http.get<County[]>('http://localhost:55211/api/County/').subscribe(data =>{this.counties = data}); 
  }

}
