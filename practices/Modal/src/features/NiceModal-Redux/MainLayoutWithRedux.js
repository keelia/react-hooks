import React from "react";
import { Provider } from 'react-redux';
import store from './store'
import Sidebar from "./Sidebar";
import UserList from "./UserList";
import UserModal from "./UserModal";

const MainLayoutWithRedux = () =>{
    return (
        <Provider store={store}>
        <div className="main-layout">
            <Sidebar/>
            <UserList/>
        </div>
        <div>
            <UserModal/>
        </div>
        </Provider>
        );
}
export default MainLayoutWithRedux