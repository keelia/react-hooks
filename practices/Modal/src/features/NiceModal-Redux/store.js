import { createStore,combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import usersReducer from "./usersReducer";
import modalReducer from "./NiceModal/niceModalReducer";

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(combineReducers({
    'nice-modal':modalReducer,
    'users':usersReducer
}),applyMiddleware(thunkMiddleware))
// store.subscribe(_=>console.log(store.getState()))

export default store