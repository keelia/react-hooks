# React Hooks
## Basics
- reusable logic
- single responsibility
### Custom Hooks Scenario
- Extract business logic
- Encapsulate generic logic : useAsync
```
const useAsync = (asyncFunc)=>{
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const execute = useCallback(()=>{
        setLoading(true)
        asyncFunc().then(response=>{
            setData(response)
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
            setError(err)
        })
    },[asyncFunc])
    return {data,loading,error,execute}
}
```
- Listen on browser : useScroll / useCookies / useLocalStorage
- divide complex component into hooks

### Redux
#### Redux Store
- Global unique
- Tree structure

#### Redux Usage
- Share states across components
- Share states across multiple instances from one component

#### Basic Concepts
- state/store, pure JS object
- action, pure js object
- reducer, a function accepts state and action as params, get a new Store from calculation
![image](./public/redux-state-action-reducer.png)
- Every change for Store should use reducer 
  - Immutable
  - Predictale
  - Easy to track and debug

### React Redux
![image](./public/react-redux.png)
- In practice, we don't need care about how View is bind to data from Store, react-redux do this for us.

### Redux [Async Action](https://redux.js.org/understanding/thinking-in-redux/glossary#async-action)
- Mainly for processing async logic.
- Async action is not a specific concept,it's a usage of Redux by combining actions to implement async data processing, and without adding any new concept.
- A Redux action can be anything, an object or a function. By using this mechanism, Redux provides redux-thunk as middlware. If the middleware receives a function as a params, it will run this function by passing into dispatch, before passing to reducer. So that you can device when and how to dispatch action.
![image](./public/redux-thunk.png)


#### reusabe fetchData by Async Action
- How to fetch data in general way ? 
  - Normally need 3 actions : fetching/loading;fetched/success;fetched/failed;
    - dispatch({ type: 'FETCH_DATA_BEGIN' });
    - dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
    - dispatch({ type: 'FETCH_DATA_FAILURE', error: err });
  - Combined with 3 selectors
    - const data = useSelectore(state => state.data); 
    - const pending = useSelector(state => state.pending); 
    - const error = useSelector(state => state.error);
```
export const useAsync = (asyncFunc)=>{
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const execute = useCallback(()=>{
        setLoading(true)
        asyncFunc().then(response=>{
            setData(response)
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
            setError(err)
        })
    },[asyncFunc])
    return {data,loading,error,execute}
}
```
- Make fetchData(thunk) reusable by Async Action in Redux
  - Set up redux-thunk
  - Create thunk
```
//set up redux-thunk to store
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

const composedEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, composedEnhancer)

//create a thunck by hand, combining actions in async function

const fetchData = ()=>(dispatch)=>{
  dispatch({ type: 'FETCH_DATA_BEGIN' }); 
  fetch('/some-url')
    .then(res => { 
        dispatch({ type: 'FETCH_DATA_SUCCESS', data: res }); 
      })
    .catch(err => { 
        dispatch({ type: 'FETCH_DATA_FAILURE', error: err }); 
      })
  }
```
- Async action in react-redux app
  - [Config store which includes middleware](https://redux.js.org/usage/configuring-your-store#the-solution-configurestore)
  - Create thunk
```
// config store
import configureStore from './configureStore'
const store = configureStore()

//Create thunk method 1 : createAsyncThunk
export const incrementAsync = createAsyncThunk(
  'counter2/fetchCount', //action type string
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//Create thunk method 2 : create thunk by hand
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};
```

## Practices
> #### Develop React is actually for developing and managing states in application.
> - Keep states minimum
>   - do not think of state as a variable so that abuse it
>   - should keep it minimum but with completeness
>     - data can be calculated from existing state, we should calculate it as needed, withoiy save the calculate result into some existing state.
>  - steps to think about state
>     1. how many states the entire funtion should have
>       - data from API?
>       - inputs from User?
>       - filtered/processed data based on inputs
>     2. does those states are all necessary ? if there some of them can be get by calculating
> - avoid intermediate state, make sure single data source. Find the correct source of state and ues it directly,without creating extra state. More states interact with each other, more logic to handle them.

### Practice : Create custom controlled component
<p>React controlled Component</p> : its value determited by passing value, instead of user inputs

```
<input value={value} onChange={handleChange} />
```

<p>
React uncontrolled Component</p>
: it can have its own internal state, its displaying value isn't controled by React.

```
<input onChange={handleChange} />
```

