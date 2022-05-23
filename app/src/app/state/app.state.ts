export enum ViewStatus {
    Initial = 'INITIAL',
    Loading = 'LOADING',
    Success = 'SUCCESS',
    Failure = 'FAILURE',
}

export interface DataState {
  journeyData: JourneyData;
  stepData: StepData;
}

export interface JourneyData {
  title: string,
  journeyId: string;
  sections: [];
}
export interface StepData {
  steps: [
    {
      title: string,
      sections: string,
    }
  ];
}

export interface UiState {
  viewStatus: ViewStatus;
  errorMessage?: string;
  currentStep: string; //geg. noch auf number oder StepId ändern
}

export interface AppState {
  uiState: UiState;
  dataState: DataState;
}

