import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'


function counterReducer(state={count:0},action){
    console.log('reducer',state,action)
    switch (action.type) {
        case 'counter/incremented':
            return {...state,count:state.count +1}
        case 'counter/decremented':
            return {...state,count:state.count -1}
        default:
            break;
    }
}

const composedEnhancer = applyMiddleware(thunkMiddleware)
let store = createStore(counterReducer,composedEnhancer)
store.subscribe(() => console.log('state:',store.getState()))
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/decremented' })
