import { loadStepSuccess } from '../step.actions';



export default function stepdataReducer(state, action) {
  switch (action.type) {
    case loadStepSuccess.type: {
      return {
        ...state,
        steps : [
        
        action.payload.title,
        action.payload.sections,
        ]
      } 
    }
    default:
      return state
  }
}
