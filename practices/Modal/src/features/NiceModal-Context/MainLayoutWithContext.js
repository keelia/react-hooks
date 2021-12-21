import React from "react";
import { useUsers } from "./useUsers";
import { NiceModalContext,useNiceModal } from "./NiceModal/NiceModal";
import Sidebar from "./Sidebar";
import UserList from "./UserList";
import UserModal from "./UserModal";
import { UsesrContext } from "./useUsers";

const MainLayoutWithContext = () =>{
    const userModal = useNiceModal('user-modal');
    const users = useUsers();
    return (
        <NiceModalContext.Provider value={{"user-modal":userModal}}>
            <UsesrContext.Provider value={{users}}>
            <div className="main-layout">
                <Sidebar/>
                <UserList/>
            </div>
            <div>
                <UserModal/>
            </div>
            </UsesrContext.Provider>
        </NiceModalContext.Provider>
        );
}

export default MainLayoutWithContext