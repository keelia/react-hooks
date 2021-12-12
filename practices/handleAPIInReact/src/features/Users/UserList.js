import React from "react";
import ListWithMore from "./ListWithMore";

const UserList = ({data=[]}) =>{
    return (
      <div>
        <h1>User List</h1>
        <div>
          <div>
            <span>Name</span>
            <span>City</span>
            <span>Job</span>
          </div>
          <ListWithMore 
            data={data}
            maxCount={7}
            renderItem={({item})=>(
            <div key={item.id}>
              <span>{item.name}</span>
              <span>{item.city}</span>
              <span>{item.job}</span>
            </div>
          )}/>
        </div>
      </div>
      
    );
}
export default UserList