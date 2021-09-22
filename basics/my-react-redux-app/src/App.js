import React,{createContext, useContext, useState} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Counter2 } from './features/counter2/Counter2';


const themes = { light: { foreground: "#000000", background: "#eeeeee" }, dark: { foreground: "#ffffff", background: "#222222" }};
const ThemeContext = createContext({theme:'light',toggleTheme:()=>{}});
function App() {
  const [selectedTheme,setSelectedTheme] = useState('light')
  const toggleTheme = (e)=>{
    setSelectedTheme(e.target.value)
  }
  return (
    <ThemeContext.Provider value={{theme:selectedTheme,toggleTheme}}>
    <div className="App">
      <Toolbar selectedTheme={selectedTheme} toggleTheme={toggleTheme}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{border:'1px solid red',marginBottom:10}}>
          <p>Counter</p>
          <Counter />
        </div>
        <div style={{border:'1px solid blue'}}>
          <p>Counter2</p>
          <Counter2/>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  const theme = useContext(ThemeContext);
  return (
    <div>
      {/* <select value={props.selectedTheme} onChange={props.toggleTheme}>
        <option value='dark'>dark</option>
        <option value='light'>light</option>
      </select>
      <button style={{
        backgroundColor:theme.background,
        color:theme.foreground
      }}>I am styled by context</button> */}
      {/**below is example use context at other place which is hard to pass context-props down to it, we can use Consumer combining with update data-structure of contect */}
      <ThemeContext.Consumer>
        {({theme:selectedTheme,toggleTheme})=>{
          return <>
                <select value={selectedTheme} onChange={toggleTheme}>
                  <option value='dark'>dark</option>
                  <option value='light'>light</option>
                </select>
                <button style={{
                  backgroundColor:themes[selectedTheme].background,
                  color:themes[selectedTheme].foreground
                }}>I am styled by context</button>
                </>
        }}
      </ThemeContext.Consumer>


    </div>
  )
}
export default App;
