import {combineReducers} from 'redux'
import UserResucer from './userReducer'
import professionReducer from './professionReducer'

const rootReducer = combineReducers({
userR: UserResucer,
professionR: professionReducer
})

export default rootReducer