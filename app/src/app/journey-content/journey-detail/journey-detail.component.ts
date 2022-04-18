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
  journeys: Journey[] = [];
  journey?: Journey;
  steps: Step[] = [];
  error: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private journeyService: JourneyService,
  ) { }

  ngOnInit(): void {
    this.getJourneys();
    this.route.paramMap.subscribe((params: ParamMap) =>{
      let id = Number(params.get('id'));
      this.journeyId = id;
    });

    console.log("This Journeys ID: " + JSON.stringify(this.journeyId));
    this.journeys.find((journey) => {
      if(journey.id == this.journeyId)
      {
        this.journey = journey;
        this.steps = journey.steps;
      }
    });
    console.log("This Journeys Steps: " + JSON.stringify(this.steps[0]));

  }

  getJourneys():void {
    this.journeys = this.journeyService.getJourneys();
  }

  getSteps(): void {
    this.journeys.find((journey) => this.steps = journey.steps)
  }

  isFirstStep(id: number): boolean {
    return this.journeyService.isFirstStep(id);
  }

  isLastStep(id: number): boolean {
    return this.journeyService.isFirstStep(id);
  }

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
