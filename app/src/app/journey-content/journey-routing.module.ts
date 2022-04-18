import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyDetailComponent } from './journey-detail/journey-detail.component';
import { JourneyListComponent } from './journey-list/journey-list.component';
import { JourneyOverviewComponent } from './journey-overview/journey-overview.component';

const routes: Routes = [
    { path: 'journeys', component: JourneyListComponent},
    {
      path: 'journeys/:id',
      component: JourneyDetailComponent,
      children: [
        {path: 'overview', component: JourneyOverviewComponent },
      ]
     },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyRoutingModule { }
