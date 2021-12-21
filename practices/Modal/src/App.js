import React from "react";
import 'antd/dist/antd.css';
import './App.css';
// import MainLayoutWithRedux from "./features/NiceModal-Redux/MainLayoutWithRedux";
// import MainLayoutWithContext from "./features/NiceModal-Context/MainLayoutWithContext";
import MainLayoutWithContextAndReducer from "./features/NiceModal-Context-Reducer/MainLayoutWithContextAndReducer";

export default function App() {
  return (
    <MainLayoutWithContextAndReducer/>
    // <div style={{display:'flex'}}>
    //     <MainLayoutWithRedux/>
    //     <MainLayoutWithContext/>
    // </div>
  );
}
