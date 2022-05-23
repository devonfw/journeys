import { loadStepSuccess } from '../step.actions';



export default function dataReducer(state, action) {
  switch (action.type) {
    case loadStepSuccess.type: {
      return {
        ...state,
        stepData: {
        steps : []
        }
        /*
        title: action.payload.title,
        dataId: action.payload.title.replace(/\s/g, ""),
        section: action.payload.sections,*/
      } 
    }
    default:
      return state
  }
}
