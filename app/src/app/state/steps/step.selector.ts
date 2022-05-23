import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getAppState = createFeatureSelector<AppState>("stepData");

export const getStepDataState = createSelector(
  getAppState,
  (state: AppState) => {return state.dataState}
)


