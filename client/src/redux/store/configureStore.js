import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import usersReducers from '../reducers/users'

const configureStore = () => {
    const store = createStore(combineReducers({
        user:usersReducers,
        
    }),applyMiddleware(thunk))
    return store
}

export default configureStore