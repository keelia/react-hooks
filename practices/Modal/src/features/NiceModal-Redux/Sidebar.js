import React,{useCallback} from "react";
import { useNiceModal } from "./NiceModal/NiceModal";
import { message } from "antd"
import { useUsers } from "./useUsers";

const Sidebar = () =>{
    const {add} = useUsers();
    const userModal = useNiceModal('user-modal')
    const addNewUser = useCallback(()=>{
        userModal.show({title:'Add New User'}).then(succeed=>{
            message.info(`${succeed.name} added!`)
            add(succeed)
        })
    },[userModal,add])
    return (
        <div className="sidebar">
            <button onClick={addNewUser}>Add New User</button>
        </div>
        );
}
export default Sidebar