import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, StepData } from '../../state/app.state';
import { Observable } from 'rxjs';
import { loadStep } from '../../state/steps/step.actions';
import { getStepDataState, findIndexStepExistence, getJourneySection } from '../../state/steps/step.selector';
import {takeUntil, take} from 'rxjs/operators';

@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepDetailComponent implements OnInit {

  step$: Observable<StepData>;
  index$: Observable<any>;
  journeySection$: Observable<any>;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('stepId');
      this.index$ = this.store.select(findIndexStepExistence({ step_id: id }))
      
      this.index$.pipe(take(1)).subscribe(data => {
        if (data == -1) {
          this.store.dispatch(loadStep({ stepId: id }));
         
        }
        this.journeySection$ = this.store.select(getJourneySection)
        this.journeySection$.pipe(take(1)).subscribe(sectionData => {
          let stepIdData = sectionData.sections.filter(x => !!x && x.id == id)[0]
          if (stepIdData.sections.length > 0) {
            console.log(stepIdData.sections)
            this.getSubSectionIds(stepIdData.sections)
          }
          })
      });
         
    });
    this.step$ = this.store.select(getStepDataState)
  }

  getSubSectionIds(data) {
      for (let i = 0; i < data.length; i++) {
        this.index$ = this.store.select(findIndexStepExistence({ step_id: data[i].id }))
        this.index$.subscribe(indexData => {
          console.log(indexData)
          if (indexData == -1) {
              console.log("loadStep")
              this.store.dispatch(loadStep({ stepId: data[i].id }));
          }})
        if (data[i].sections.length > 0) {
          console.log(data[i].sections)
          this.getSubSectionIds(data[i].sections)
        }
      }
  }

}
