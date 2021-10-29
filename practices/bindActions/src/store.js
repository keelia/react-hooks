import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { bindActionCreators } from 'redux'

function counterReducer(state={count:0},action){
    switch (action.type) {
        case 'counter/incremented':
            return {...state,count:state.count + action.n}
        case 'counter/decremented':
            return {...state,count:state.count - action.n}
        default:
            break;
    }
}

const composedEnhancer = applyMiddleware(thunkMiddleware.withExtraArgument({
    api:'this is api',
    token:'this is auth token'
}))
let store = createStore(counterReducer,composedEnhancer)
store.subscribe(() => console.log('state:',store.getState()))
//action creators
const incremente = (num)=>{
    return {
        type: 'counter/incremented',
        n:num
    }
}
const decremente = (num)=>{
    return {
        type: 'counter/decremented',
        n:num
    }
}
//store.dispatch(incremente(5))
// store.dispatch(incremente(10))
// store.dispatch(decremente(15))

const sleep = (sleepCount)=>{
    return new Promise(resolve=>{
        setTimeout(resolve,sleepCount)
    })
}
//thunk : a function return a function / A thunk is a function that wraps an expression to delay its evaluation.
const incrementeAsync = (num)=>(dispatch,getState,extraArg)=>{
    return sleep(500).then(res=>{
        dispatch(incremente(num))
        return 'done!'
    })
}
// store.dispatch(incrementeAsync(10)).then(res=>{ //.then need incrementeAsync return sleep(5000)...
//     console.log('promise then after dispatch',res)
// })


/**
 * Bind Action creators
 * Normally you should just call dispatch directly on your Store instance. 
 * If you use Redux with React, react-redux will provide you with the dispatch function so you can call it directly, too.
 * The only use case for bindActionCreators is when you want to pass some action creators down to a component that isn't aware of Redux, 
 * and you don't want to pass dispatch or the Redux store to it.
 */

 const boundActionCreators = bindActionCreators({
        incremente,
        decremente
    }, store.dispatch)
 boundActionCreators.incremente(222)

