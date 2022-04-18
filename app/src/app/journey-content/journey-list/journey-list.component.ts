import { Component, OnInit } from '@angular/core';
import { Journey } from '../journeys';
import { JourneyService } from '../journey.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.css']
})
export class JourneyListComponent implements OnInit {

  journeys: Journey[] = [];
  error: any;
  selectedId: number = 0;
  constructor(private journeyService: JourneyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getJourneys();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = Number(params.get('id'));
      this.selectedId = id;
    })
  }

  getJourneys():void {
    this.journeys = this.journeyService.getJourneys();
  }

  onSelect(journey: Journey): void {
    //this.router.navigate(['journeys', journey.id])
    this.router.navigate([journey.id], {relativeTo: this.route})
  }

  isSelected(journey: Journey) { return journey.id === this.selectedId; }

}
