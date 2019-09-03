import { GET_DATA } from '../types'

  const initialState = {
      isLoading: false,
  }

export default (state = initialState, action) => {
    switch(action.type) {

        case GET_DATA:
            return { ...state }
        default:
            return state;  
    }
}