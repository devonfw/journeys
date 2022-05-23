import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyDetailComponent } from './journey-detail/journey-detail.component';
import { JourneyListComponent } from './journey-list/journey-list.component';
import { StepDetailComponent } from './step-detail/step-detail.component'

const routes: Routes = [
    { path: 'journeys', component: JourneyListComponent},
    { path: 'journeys/:journeyId', component: JourneyDetailComponent},
    { path: 'journey/:journeyId/:stepId', component: StepDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyRoutingModule { }
