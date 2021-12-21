import React from "react";
import 'antd/dist/antd.css';
import './App.css';
import MainLayoutWithRedux from "./features/NiceModal-Redux/MainLayoutWithRedux";
import MainLayoutWithContext from "./features/NiceModal-Context/MainLayoutWithContext";

export default function App() {
  return (
    <div style={{display:'flex'}}>
        <MainLayoutWithRedux/>
        <MainLayoutWithContext/>
    </div>
    
  );
}
