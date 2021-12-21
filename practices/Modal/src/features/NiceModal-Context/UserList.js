import React,{useCallback} from "react";
import ContextRenderer from "./ContextRenderer";

const UserList = () =>{
    const edit = useCallback((user,users,userModal)=>{
        userModal.show({user,title:`Edit ${user.name}`}).then(succeed=>{
            users.updateUser(succeed)
        })
    },[])
    return (<ContextRenderer>
            {({"user-modal":userModal,users})=>(
                <div className="user-list">
                <div className="user-row user-title-row"> <span>Name</span> <span>Job Title</span> <span>Action</span> </div>
                {users?.users?.map(user=>(
                    <div key={user.id} className="user-row">
                        <span>{user.name}</span>
                        <span>{user.job}</span>
                        <span><button onClick={e=>edit(user,users,userModal)}>Edit</button></span>
                    </div>
                ))}
                </div>
            )}
        </ContextRenderer>);
}
export default UserList