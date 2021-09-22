import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
  useLocation
} from "react-router-dom";
import { useAsync, useCookies, useLocalStorage, useScroll,setCookies,deleteCookies} from "./features/customHooks";
import axios from "axios";
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  let match = useRouteMatch();
  const matchedURL = useMemo(()=>{
    return match.url === '/'?'':match.url
  },[match])

  const matchedPatch = useMemo(()=>{
    return match.path === '/'?'':match.path
  },[match])

  let location = useLocation();
  const currentLocation = useMemo(()=>{
    return location.pathname
  },[location])

  const isActive = useCallback((segment)=>{
    return currentLocation.includes(segment)
  },[currentLocation])

  const activeStyle = useCallback((segment)=>{
    return isActive(segment) ? {color:'orange',fontWeight:'bold'} :{}
  },[isActive])
  return (
    <div>
      <h1 className="text-center">React Hooks</h1>
      <section>
        <h2>Custom Hooks</h2>
        <div style={{display:'flex',justifyContent:'space-around'}}>
          <CookiesInput/>
          <LocalStorageInput/>
        </div>
        <div>
        <ul style={{display:'flex',justifyContent:'space-evenly',listStyle:'none'}}>
          <li>
            <Link to={`${matchedURL}/active`} style={activeStyle('active')}>Active</Link>
          </li>
          <li>
            <Link to={`${matchedURL}/overdue`} style={activeStyle('overdue')}>
              Overdue
            </Link>
          </li>
          <li>
            <Link to={`${matchedURL}/completed`} style={activeStyle('completed')}>
              Completed
            </Link>
          </li>
          <li>
            <Link to={`${matchedURL}/canceled`} style={activeStyle('canceled')}>
              Canceled
            </Link>
          </li>
        </ul>
          <Switch>
            <Route path={`${matchedPatch}/:activeTab`}>
              <Topic />
            </Route>
            <Redirect to={{
              pathname:'/active',
              state:{referrer:currentLocation}
            }}/>
            <Route path={matchedPatch}>
              <h3>Please select a topic.</h3>
            </Route>
          </Switch>
          <div><ScrollTop/></div>
        </div>

      </section>

    </div>
  );
}

function Topic() {
  const params = useParams();
  let { activeTab } = params;
  
  const {execute:fetchDataByTab,data,loading,error} = useAsync(
    useCallback(async ()=>{
      const response = await axios.get(`http://localhost:3000/${activeTab}`)
      return response.data
    },[activeTab])
   )

  useEffect(()=>{
    fetchDataByTab(activeTab)
  },[activeTab,fetchDataByTab])

  return <>
  <h3>Requested Tab ID: {activeTab}</h3>
  {loading ? 'Loading...' :  (error ?'Error!' :<ul style={{listStyle:'none'}}>
    {data?.map((item,index)=>(
      <li key={`item${index}`}>
        <p style={{color:'red',fontSize:22}}>{item.name}</p>
        <p>{item.value}</p>
      </li>
    ))}
  </ul>)}
  </>;
}

const ScrollTop = ()=>{
  const {y} = useScroll()
  const backToTop = useCallback(()=>{
    document.documentElement.scrollTop = 0
  },[])

  const btnStyles = {
    position:'fixed',
    right:10,
    bottom:10
  }
  return y >300 ? (
    <button style={btnStyles} onClick={backToTop}>Back to Top</button>
  ): null
}

const LocalStorageInput = ()=>{
  const [value,setValue] = useState('')
  const saved = useLocalStorage('test')
  const handleInput = e=>{
    setValue(e.target.value)
  }
  const saveStorage = ()=>{
    window.localStorage.setItem('test',value)
    setValue('')
  }
  return <div className="sectionItem">
    <h3>Local Storage</h3>
  <input value={value} onChange={handleInput}/>
  <button onClick={saveStorage}>Save</button>
  <p>Saved in localStorage : {saved}</p>
  <small>Be sure to open it in two tabs (the same link). Store value in one tab and see this value in another tab.</small>
  </div>
}

const CookiesInput = ()=>{
  const [value,setValue] = useState('')
  const saved = useCookies('test')
  const handleInput = e=>{
    setValue(e.target.value)
  }
  const handleSave = ()=>{
    setCookies('test',value)
    setValue('')
  }
  const handleDelete = ()=>{
    deleteCookies('test',value)
    setValue('')
  }
  return <div className="sectionItem">
    <h3>Cookies</h3>
    <input value={value} onChange={handleInput}/>
    <button onClick={handleSave}>Save</button>
    <button onClick={handleDelete}>Delete</button>
    <p>Saved in Cookies : {saved}</p>
  </div>
}