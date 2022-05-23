import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, tap} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataState, AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Step } from "../../journey-content/step"

@Injectable({
  providedIn: 'root'
})
export class StepService {
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getStep(title: string) {
    return this.http.get('../../../assets/'+ title +'.json') as Observable <Step>


  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.message || "Server Error");
  }

}