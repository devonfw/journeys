import { loadJourneySuccess } from '../journey.actions';



export default function dataReducer(state, action) {
  switch (action.type) {
    case loadJourneySuccess.type: {
      return {
        ...state,
        journeyData: {
          title: action.payload.title,
          journeyId: action.payload.title.replace(/\s/g, ""),
          sections: action.payload.sections,
        }
      }
    }
    default:
      return state
  }
}
