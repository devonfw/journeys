import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, StepData } from '../../state/app.state';
import { Observable } from 'rxjs';
import { loadStep } from '../../state/steps/step.actions';
import { getStepDataState, findIndexStepExistence, getJourneySection } from '../../state/steps/step.selector';


@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepDetailComponent implements OnInit {

  step$: Observable<StepData>;
  index$: Observable<any>;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('stepId');
      this.index$ = this.store.select(findIndexStepExistence({ step_id: id }))
      this.index$.subscribe(data => {
        if (data == -1) {
          let journeySection: any = this.store.select(getJourneySection)
          journeySection.subscribe(sectionData => {
            console.log(sectionData);
            let stepIdData = sectionData.sections.filter(x => !!x && x.id == id)[0]
            console.log(stepIdData)
            if (stepIdData.sections.length > 0) {
              let subIds: [];
              let results = this.getSubSectionIds(stepIdData.sections, subIds)
              console.log(results)
            }
            //
            }),
             
          
          this.store.dispatch(loadStep({ stepId: id }));
        }
      });
         
    });
    this.step$ = this.store.select(getStepDataState)
  }

  getSubSectionIds(data: [], subIds) {
      let subSections: any = data
      for (let i = 0; i < subSections.length; i++) {
        console.log(subSections[i].id)
        console.log(subIds)
        subIds.push(subSections[i].id)
        console.log(subIds)
        if (subSections[i].sections.length > 0) {
          console.log("Recursion")
          this.getSubSectionIds(subSections[i].sections, subIds)
        }
        
        
        
      }
        
  
    

  }

}
