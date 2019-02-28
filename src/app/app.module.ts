import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CommentsComponent } from './comments/comments.component';
import { ImdbComponent } from './imdb/imdb.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountyPdComponent } from './county-pd/county-pd.component';
import { ComplaintFormComponent } from './complaints/complaint-form/complaint-form.component';
import { ComplaintEditComponent } from './complaints/complaint-edit/complaint-edit.component';
//import {MatDatepickerModule} from '@angular/material/datepicker';
//npm install --save @angular/material @angular/cdk

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    CommentsComponent,
    ImdbComponent,
    ComplaintsComponent,
    CountyPdComponent,
    ComplaintFormComponent,
    ComplaintEditComponent
    //MatDatepickerModule 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
