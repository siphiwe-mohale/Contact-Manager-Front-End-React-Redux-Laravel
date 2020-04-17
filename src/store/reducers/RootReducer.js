import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ContactReducer from './ContactReducer'

const RootRedcer = combineReducers({
    auth: AuthReducer,
    contact: ContactReducer
})

export default RootRedcer