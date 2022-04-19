import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../journey.service';
import { Journey, Step } from '../journeys';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-journey-overview',
  templateUrl: './journey-overview.component.html',
  styleUrls: ['./journey-overview.component.css']
})
export class JourneyOverviewComponent implements OnInit {

  public journeyId: number = 0;
  stepId: number = 0;
  isJourneyExisting: boolean = false;
  journeys: Journey[] = [];
  journey?: Journey;
  title: string = "";
  currentStep: number = 0;
  amountSteps: number = 0;
  isJourneyFinished: boolean = false;
  steps: Step[] = [];
  content: string = "";

  constructor(private journeyService: JourneyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.journeys = this.journeyService.getJourneys();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.journeyId = Number(params.get('journeyId'));
      this.stepId = Number(params.get('stepId'));
    });
    this.selectJourney();
  }

  fetchJourneys(): void {
    this.journeyService.fetchJourneys().subscribe((journey) => {
      this.journeys = journey;
    });
  }

  selectJourney(): void {
    this.journeys.find((journey) => {
      if(journey.id == this.journeyId)
      {
        this.journey = journey;
        this.title = journey.title;
        this.currentStep = this.stepId;
        this.amountSteps = journey.amountSteps;
        this.isJourneyFinished = journey.isJourneyFinished;
        this.steps = journey.steps;
        this.steps.find((step) => {
          if(step.id == this.stepId)
          {
            this.content = step.content;
          }
        })
      }
    });
  }

  onSelect(journey: Journey): void {
    //this.router.navigate(['journeys', journey.id])
    this.router.navigate([journey.id, 'overview'], {relativeTo: this.route})
  }

  isNotFirstStep(): boolean {
    //let result = this.journeyService.isFirstStep(this.journeyId, this.journeys);
    let result = (this.currentStep > 1);
    console.log("Journey-overview-Component: isNotFirstStep() " + result + "currentStep : " + this.currentStep);
    return result
  }

  isNotLastStep(): boolean {
    let result = (this.currentStep < this.amountSteps)
    console.log("Journey-overview-Component: isNotLastStep() " + result + "currentStep : " + this.currentStep);
    return result;
  }

  goPrevious(): void {
    let previousStep = this.currentStep-1;
    if(previousStep >= 1) {
      this.currentStep -= 1;
      this.updateContent(this.currentStep);
      this.router.navigate(['../../', previousStep, 'overview'], {relativeTo: this.route});
    }
    else
    {
      //this.router.navigate(['../'], {relativeTo: this.route});
      console.log("This is the first Step");
    }
  }

  goNext(): void {
    let nextStep = this.currentStep + 1;
    if(nextStep <= this.amountSteps) {
      this.currentStep += 1;
      this.updateContent(this.currentStep);
      this.router.navigate(['../../', nextStep, 'overview'], {relativeTo: this.route});
    }
  }

  updateContent(id: number): void {
    this.steps.find((step) => {
          if(step.id == id)
          {
            this.content = step.content;
          }
        });
  }


/*
  getSteps(): Step[] {
    return this.journeyService.getSteps(this.journeyId);
  }

  */
}
