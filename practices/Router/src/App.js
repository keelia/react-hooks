import React from "react";
import 'antd/dist/antd.css';
import './App.css';
// import {Overview as ToyOverview,ROUTES as TOY_ROUTES} from "./features/ToyRouter";
// import {Overview,ROUTES} from "./features/NestedRouter";
// import { Overview } from "./features/SharingPageStates";
import { Overview } from "./features/RouterAuth";

export default function App() {
  // return (<ToyOverview routes={TOY_ROUTES}/>);
  // return (<Overview routes={ROUTES}/>);
  return <Overview/>
}
