import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {APPS_LIST_REQUEST, APPS_LIST_SUCCESS, APPS_LIST_FAIL} from '../constants/appsConstants'


export const listApps = () => async (dispatch) => {
    try{

        dispatch({type: APPS_LIST_REQUEST})

        const { data } = await axios.get('http://localhost:8000/logger/load_apps/')

        dispatch({
            type:APPS_LIST_SUCCESS,
            payload: data            
        })

    }catch(error){
        dispatch({
            type:APPS_LIST_FAIL,
            payload: error.response && error.response.data.message 
                    ? error.response.data.message
                    : error.message,        
        })
    }
}