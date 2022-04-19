import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router , ParamMap } from '@angular/router';
import { JourneyService } from '../journey.service';
import { Journey, Step } from '../journeys';

@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.component.html',
  styleUrls: ['./journey-detail.component.css']
})
export class JourneyDetailComponent implements OnInit {

  public journeyId: number = 0;
  isJourneyExisting: boolean = false;
  journeys: Journey[] = [];
  journey?: Journey;
  title: string = "";
  currentStep: number = 0;
  amountSteps: number = 0;
  isJourneyFinished: boolean = false;
  steps: Step[] = [];
  error: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private journeyService: JourneyService,
  ) { }

  ngOnInit(): void {
    this.fetchJourneys();
    this.route.paramMap.subscribe((params: ParamMap) =>{
      let id = Number(params.get('id'));
      this.journeyId = id;
      this.steps = this.getSteps();
    });
    this.isJourneyExisting = this.selectJourney();

    console.log("This Journeys ID: " + JSON.stringify(this.journeyId));
    console.log("This Journeys Steps: " + JSON.stringify(this.steps));

  }

  fetchJourneys(): void {
    this.journeyService.fetchJourneys().subscribe((journey) => {
      this.journeys = journey;
    });
  }

  selectJourney(): boolean {
    let isJourneyExisting: boolean = false;
    this.journeys.find((journey) => {
      if(journey.id == this.journeyId)
      {
        isJourneyExisting = true;
        this.journey = journey;
        this.title = journey.title;
        this.currentStep = journey.currentStep;
        this.amountSteps = journey.amountSteps;
        this.isJourneyFinished = journey.isJourneyFinished;
        this.steps = journey.steps;
      }
    });
    return isJourneyExisting;
  }

  getSteps(): Step[] {
    return this.journeyService.getSteps(this.journeyId);
  }
/*
  isFirstStep(): boolean {
    return this.journeyService.isFirstStep(this.journeyId);
  }

  isLastStep(): boolean {
    return this.journeyService.isFirstStep(this.journeyId);
  }
  */

  goPrevious(): void {
    let previousId = this.journeyId - 1;
    if(!this.journeyService.isFirstStep(previousId))
    {
      this.router.navigate(['../', {id: previousId}], {relativeTo: this.route});
    }
    else
    {
      //this.router.navigate(['../'], {relativeTo: this.route});
      console.log("This is the first Step");
    }
    //if(!this.journeyService.isJourneysFirstStep(previousId)) {}
    //this.location.back();
  }

  goNext(): void {
    //let id = Number(this.route.snapshot.paramMap.get('id'));
   // console.log("Journey-Detail-goForward(): " + id);
    //console.log("Journey-Detail-goForward(): last step?:" + JSON.stringify(this.journeyService.isJourneysLastStep(id)));
    //if(!this.journeyService.isJourneysLastStep(id))
    //  id +=1;
    let nextId = this.journeyId + 1;
    this.router.navigate(['../', nextId], {relativeTo: this.route});
  }

  showOverview(): void {
    this.router.navigate(['overview'], {relativeTo: this.route});
  }

  onSelect(journey: Journey): void {
    //this.router.navigate(['journeys', journey.id])
    this.router.navigate([journey.id], {relativeTo: this.route})
  }

  isSelected(journey: Journey) { return journey.id === this.journeyId; }
}
