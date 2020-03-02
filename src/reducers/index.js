import { combineReducers } from 'redux'
import gallery from './gallery'
import notification from './notification'

const reducer = combineReducers({
  gallery,
  notification
})

export default reducer
