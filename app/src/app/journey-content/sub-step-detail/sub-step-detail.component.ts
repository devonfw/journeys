import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, JourneyData, StepData } from '../../state/app.state';
import { loadStep } from '../../state/steps/step.actions';
import { getStepDataState, findIndexStepExistence, getJourneySection } from '../../state/steps/step.selector';
import { take } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-sub-step-detail',
  templateUrl: './sub-step-detail.component.html',
  styleUrls: ['./sub-step-detail.component.scss']
})
export class SubStepDetailComponent implements OnInit {

  @Input() sections: any;


  step$: Observable<StepData>;
  index$: Observable<any>;
  journeySection$: Observable<any>;
  journey$: Observable<JourneyData>;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let element = document.getElementById("substepdetail")

   
    console.log(this.sections)
    this.getSubSections(this.sections)
    this.step$ = this.store.select(getStepDataState)
  }


  getSubSections(data) {
      this.index$ = this.store.select(findIndexStepExistence({ step_id: data.id }))
      this.index$.pipe(take(1)).subscribe(indexData => {
        if (indexData == -1) {
            this.store.dispatch(loadStep({ stepId: data.id }));
        }
      })

    if (data.sections.length > 0) {
      for (let i = 0; i < data.sections.length; i++) {
        this.getSubSections(data.sections[i])
        }
      }
    }
    
  }




