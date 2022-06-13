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
    for (let i = 0; i < this.sections.length; i++) {
      element.innerHTML += this.sections[i]
      console.log(this.sections[i])
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('stepId');
      this.journeySection$ = this.store.select(getJourneySection)
      this.journeySection$.pipe(take(1)).subscribe(sectionData => {
        let stepIdData = sectionData.sections.filter(x => !!x && x.id == id)[0]
        if (stepIdData.sections.length > 0) {
          this.getSubSectionIds(stepIdData.sections)
        }
      })
      this.index$ = this.store.select(findIndexStepExistence({ step_id: id }))
    });
    this.step$ = this.store.select(getStepDataState)
  }

  getSubSectionIds(data) {
    for (let i = 0; i < data.length; i++) {
      this.index$ = this.store.select(findIndexStepExistence({ step_id: data[i].id }))
      this.index$.subscribe(indexData => {
        if (indexData == -1) {
          this.store.dispatch(loadStep({ stepId: data[i].id }));
        }
      })
      if (data[i].sections.length > 0) {
        this.getSubSectionIds(data[i].sections)
      }
    }
  }
}


