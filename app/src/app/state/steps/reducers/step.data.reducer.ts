import { loadStepSuccess } from '../step.actions';



export default function stepdataReducer(state, action) {
  switch (action.type) {
    case loadStepSuccess.type: {
      console.log(state)
      return {
        ...state,
        steps: [
          ...state.steps, action.payload
        ]
      } 
    }
    default:
      return state
  }
}
