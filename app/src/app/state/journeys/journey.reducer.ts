import { ViewStatus, JourneyData, StepData,  UiState, AppState, DataState } from '../app.state';
import uiReducer from './reducers/journey.ui.reducer'
import dataReducer from './reducers/journey.data.reducer'
import { ActionReducerMap } from '@ngrx/store';

export const initialUiState: UiState = {
  viewStatus: ViewStatus.Initial,
  currentStep: "",
}

const initialJourneyData: JourneyData = {
  title: " ",
  journeyId: "",
  sections: [],
}
const initialStepData: StepData = {
  steps: [
    {title: "",
    sections: "",
    }
  ]
}
export const initialDataState: DataState = {
  journeyData: initialJourneyData,
  stepData: initialStepData,
}

export const initialState: AppState = {
  uiState: initialUiState,
  dataState: initialDataState,
};


// export function appReducer(state = initialState, action): ActionReducerMap<AppState>  {
//   return {
    
//     uiState: uiReducer(state.uiState , action),
//     dataState: dataReducer(state.dataState, action)
//   }
// }
