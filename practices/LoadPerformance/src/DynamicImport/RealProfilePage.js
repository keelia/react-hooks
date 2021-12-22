import React, { useEffect, useState } from "react";
import APIClient from  '../APIClient';
export default  props=>{
        const [users,setUsers] = useState([])
        useEffect(()=>{
          APIClient.get('users').then(res=>setUsers(res.data))
        },[]);
        console.log(users)
        return <><h1>{JSON.stringify(users)}</h1>
        <p>I am the Real Profile Page</p></>
}