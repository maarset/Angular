import { Component, OnInit } from '@angular/core';
import { County } from '../Models/county';   //importing complaint.ts custom object. Don't have to use app.module.ts
import { HttpClient } from '@angular/common/http';
import { get } from 'selenium-webdriver/http';

@Component({
  selector: 'app-county-pd',
  templateUrl: './county-pd.component.html',
  styleUrls: ['./county-pd.component.scss']
})
export class CountyPdComponent implements OnInit {

  ObjCountyList: County[] = [];
  CountyPulldown: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {


  }

}
