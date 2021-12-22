import React, { useEffect, useState } from "react";
import { BrowserRouter, Route,Link,Routes } from "react-router-dom";
import { ProfilePage } from "./DynamicImport/ProfilePage";
import './App.css';
import APIClient from  './APIClient';
import NormalPage from "./DynamicImport/NormalPage";

const Home = props=>{
  const [users,setUsers] = useState([])
  useEffect(()=>{
    APIClient.get('users').then(res=>setUsers(res.data))
  },[]);
  console.log(users)
  return <h1>{JSON.stringify(users)}</h1>
}
function App() {
  return (
    <div className="App">
      <header>
            <h1>Welcome</h1>
        </header>
        <div className="container">
            <BrowserRouter>
            <aside>
                <Link to="/normalpage">Normal</Link>
                <Link to="/profile">Load On Demond</Link>
            </aside>
            <main>
                <Routes>
                    <Route key="profile" path="/profile" element={<ProfilePage/>} />
                    <Route key="normalpage" path="/normalpage" element={<NormalPage/>} />
                    <Route key="home" path="/" element={<Home/>} />
                </Routes>
            </main>
            </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
