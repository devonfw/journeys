import { Injectable, Input } from '@angular/core';
import { Observable, throwError, catchError} from 'rxjs';
import { Journey, Step} from './journeys';
import { MessageService} from '../message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//TODO 1: Wo implementiere ich Journey zu ende ?
/*
  getSteps(): Step[];
  isStepAccomplished(id:number):boolean;
  nextStep():void;
  previousStep():void;
*/

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  private _url: string = "../../../assets/journeyMOCKUP";
  private journeys: Journey[] = [];
  constructor(private messageService: MessageService, private http: HttpClient) { }

  fetchJourneys(): Observable<Journey[]> {
    return this.http.get<Journey[]>(this._url).pipe(
                    catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.message || "Server Error");
  }

  getJourneys(): Journey[] {
    this.fetchJourneys().subscribe({next: (journey: Journey[]) => this.journeys = journey, error: (error: HttpErrorResponse) => {this.errorHandler(error)}});
    return this.journeys;
  }

  getJourney(id: number): Journey {
    let resJourney: Journey = {
        id: 0,
        title: '',
        steps: [],
        currentStep: 0,
        amountSteps: 0,
        journeyFinished: false
    };

    this.getJourneys();
    this.journeys.find((journey) => {
      if(journey.id == id)
      {
        resJourney = journey;
      }
    });
    return resJourney;
  }
  getSteps(id: number): Step[] {
    let journey: Journey = this.getJourney(id);
    return journey.steps;
  }

  isFirstStep(id: number): boolean {
    let journey = this.getJourney(id);
    return (journey.currentStep === 1);
  }

  isLastStep(id: number): boolean {
    let journey = this.getJourney(id);
    return (journey.currentStep === journey.amountSteps);
  }

  /**
  Returns the list of Steps of the journey specified by id.

  getJourneySteps(id: number): Observable<Step[] | any> {
    const journey = JOURNEYS.find(journey => journey.id === id)!;
    return of(Object.values(journey)[2]);
  }
  */
  /**
  Returns whether the journey is in the first step

  isJourneysFirstStep(id: number): boolean {
    const journey = this.getJourneyObj(id);
    return Object.values(journey)[3] === 1;
  }

  /**
  Returns whether the journey is in the last step

  isJourneysLastStep(id: number): boolean {
    const journey = this.getJourneyObj(id);
    let journeySteps = Object.values(journey)[4];
    return Object.values(journey)[3] === journeySteps;
  }
 */
}
