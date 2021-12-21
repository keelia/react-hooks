import React,{useCallback} from "react";
import { message } from "antd"
import ContextRenderer from "./ContextRenderer";

const Sidebar = () =>{
    const addNewUser = useCallback((userModal,users)=>{
        return ()=>{
            userModal.show({title:'Add New User'}).then(succeed=>{
                message.info(`${succeed.name} added!`)
                users.addUser(succeed)
            })
        }
    },[])
    return (
        <ContextRenderer>
            {({"user-modal":userModal,users})=>(<div className="sidebar">
                <button onClick={addNewUser(userModal,users)}>Add New User</button>
                <p>With Context</p>
                </div>
            )}
        </ContextRenderer>
        );
}
export default Sidebar