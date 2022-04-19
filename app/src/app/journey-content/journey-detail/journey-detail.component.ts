import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router , ParamMap } from '@angular/router';
import { JourneyService } from '../journey.service';
import { Journey, Step } from '../journeys';

@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.component.html',
  styleUrls: ['./journey-detail.component.css']
})
export class JourneyDetailComponent implements OnInit {

  selectedId: number = 0;
  journeys: Journey[] = [];
  title: string = "";
  steps: Step[] = [];
  journeysFetched:boolean = false;

  constructor(private journeyService: JourneyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.fetchJourneys();
    this.journeys = this.journeyService.getJourneys();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = Number(params.get('id'));
      this.selectedId = id;
    });
   this.journeysFetched = this.selectJourney();

    console.log("Title after Ng Init" + this.title);
  }

  selectJourney(): boolean {
    let isJourneyExisting: boolean = false;
    this.journeys.find((journey) => {
      if(journey.id == this.selectedId) {
        isJourneyExisting = true;
        this.title = journey.title;
//        this.currentStep = journey.currentStep;
//        this.amountSteps = journey.amountSteps;
//        this.isJourneyFinished = journey.isJourneyFinished;
        this.steps = journey.steps;
      }
    });
    return isJourneyExisting;
  }

  onSelect(step: Step): void {
    //this.router.navigate(['journeys', journey.id])
    this.router.navigate([step.id, 'overview'], {relativeTo: this.route})
  }

   next(): void {
    //this.router.navigate(['journeys', journey.id])
    this.router.navigate([1, 'overview'], {relativeTo: this.route})
  }

  isSelected(journey: Journey) { return journey.id === this.selectedId; }
}
