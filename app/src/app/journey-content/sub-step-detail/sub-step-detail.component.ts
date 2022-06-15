import { Component, Input, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, JourneyData, SingleStepData, StepData } from '../../state/app.state';
import { loadStep } from '../../state/steps/step.actions';
import { getStepData } from '../../state/steps/step.selector';
import { first} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-step-detail',
  templateUrl: './sub-step-detail.component.html',
  styleUrls: ['./sub-step-detail.component.scss'],
})
export class SubStepDetailComponent implements OnInit {

  @Input() sections: any;


  step$: Observable<StepData>;
  journey$: Observable<JourneyData>;
  stepData$: Observable<SingleStepData>

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
     this.store.select(getStepData({ step_id: this.sections.id })).pipe(first()).subscribe(stepData => {
      if (stepData == null) {
         this.store.dispatch(loadStep({ stepId: this.sections.id }));
      }
    })
    console.log("omin")
    this.stepData$ = this.store.select(getStepData({ step_id: this.sections.id }))
  }
}




