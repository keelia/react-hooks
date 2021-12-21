import React,{useContext,useReducer} from "react";
import { NiceModalContext } from "./NiceModal/NiceModal";
import Sidebar from "./Sidebar";
import UserList from "./UserList";
import UserModal from "./UserModal";
import niceModalReducer from "./NiceModal/niceModalReducer";
import usersReducer from "./usersReducer";
import { UsersContext } from "./useUsers";

const MainLayoutWithContextAndReducer = () =>{
    const modalContext = useContext(NiceModalContext);
    const usersContext = useContext(UsersContext);
    const [state,dispatch] = useReducer(niceModalReducer,modalContext.state)
    const [usersState,usersDispatch] = useReducer(usersReducer,usersContext.usersState)
    return (
        <NiceModalContext.Provider value={{state,dispatch}}>
            <UsersContext.Provider value={{usersState,usersDispatch}}>
                <>
                    <div className="main-layout">
                        <Sidebar/>
                        <UserList/>
                    </div>
                    <div>
                        <UserModal/>
                    </div>
                </>
             </UsersContext.Provider>
        </NiceModalContext.Provider>
        );
}

export default MainLayoutWithContextAndReducer