import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Journey } from '../journey';
import { Store } from '@ngrx/store';
import { AppState, DataState, StepData, UiState } from '../../state/app.state';
import { Observable, tap } from 'rxjs';
import { loadStep } from '../../state/steps/step.actions';
import { getStepDataState, getUiState, checkStepExistence } from '../../state/steps/step.selector';


@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StepDetailComponent implements OnInit {

  step$: Observable<StepData>;
  ui$: Observable<UiState>;
  inside$: Observable<Boolean>;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('stepId');
      console.log(id);
      this.inside$ = this.store.select(checkStepExistence({step_id: "Architecture Principles"}))
      this.inside$.subscribe(data=>{
        if(data===true) {
          console.log("gibts");
        }
        else {
          console.log("neu")
          this.store.dispatch(loadStep({ stepId: id }));
        }
      });
    

     
    });
    this.step$ = this.store.select(getStepDataState)
    this.ui$ = this.store.select(getUiState)
  }

}
