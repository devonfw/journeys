import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { JourneyRoutingModule } from './journey-content/journey-routing.module';
import { JourneyContentModule } from './journey-content/journey-content.module';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './journey-content/page-not-found/page-not-found.component';
import { MessagesComponent } from './messages/messages.component';
import { JourneyService } from './journey-content/journey.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    JourneyContentModule,
    JourneyRoutingModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [JourneyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
