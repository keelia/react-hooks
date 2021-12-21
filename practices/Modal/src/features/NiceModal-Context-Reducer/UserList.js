import React,{useCallback} from "react";
import { useNiceModal } from "./NiceModal/NiceModal";
import { useUsers } from "./useUsers";

const UserList = () =>{
    const { users,update} = useUsers()
    const userModal = useNiceModal('user-modal')
    const edit = useCallback((user)=>{
        userModal.show({user,title:`Edit ${user.name}`}).then(succeed=>{
            update(succeed)
        })
    },[userModal,update])
    return (<div className="user-list">
    <div className="user-row user-title-row"> <span>Name</span> <span>Job Title</span> <span>Action</span> </div>
    {users?.map(user=>(
        <div key={user.id} className="user-row">
            <span>{user.name}</span>
            <span>{user.job}</span>
            <span><button onClick={e=>edit(user)}>Edit</button></span>
        </div>
    ))}
    </div>);
}
export default UserList