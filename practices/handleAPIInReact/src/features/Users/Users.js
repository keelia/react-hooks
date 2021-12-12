import React from "react";
import UserList from "./UserList";
import UserNames from "./UserNames";
import { useUsers } from "./useUsers";

const Users = () =>{
  const {data:users,error,loading} = useUsers()
  if(error){
    return 'Failed'
  }else if(!users || loading){
    return 'Loading Users...'
  }
    return (
      <div>
          <UserNames data={users}/>
          <UserList data={users}/>
      </div>
    );
}
export default Users