import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import { userReducer } from './reducers/userReducer'
import { appsReducer } from './reducers/appsReducer'


const reducer = combineReducers({
    user: userReducer,
    apps: appsReducer,
})

const initialState = {}
const middleWare = [thunk]
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleWare)))

export default store