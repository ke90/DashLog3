import {APPS_LIST_REQUEST, APPS_LIST_SUCCESS, APPS_LIST_FAIL} from '../constants/appsConstants'

const initialState = { apps: [] };
export const appsReducer = (state = initialState, action) => {

    switch(action.type){
        case APPS_LIST_REQUEST:
            return {loading: true, apps:[]}

        case APPS_LIST_SUCCESS:
            return {loading: false, apps: action.payload.data}

        case APPS_LIST_FAIL:
            return {loading: false, error: action.payload}
            
        default:
            return state
    }
}
