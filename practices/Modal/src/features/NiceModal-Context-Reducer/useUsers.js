import { useCallback,createContext,useContext,useMemo } from 'react';
import { useEffect } from 'react';
import { addUser,updateUser,fetchUsersError,fetchUsersSucceed,fetchingUsers } from './usersActions';
import APIClient from '../../APIClient';

export const UsersContext = createContext({usersState:{users:null,loading:false,error:null},usersDispatch:()=>{}});

export const useUsers= ()=>{
  const {usersState:state,usersDispatch:dispatch} = useContext(UsersContext);
  const {users,loading,error} = useMemo(()=>({
    users:state?.users,
    loading:state?.loading,
    error:state?.error
  }),[state]);

  const add = useCallback((user)=>{
    dispatch(addUser(user))
  },[dispatch]);
  const update = useCallback((user)=>{
    dispatch(updateUser(user))
  },[dispatch]);

  useEffect(()=>{
    if(!state.users && !state.loading){
      dispatch(fetchingUsers())
      APIClient.get(`users`).then(res=>{
        dispatch(fetchUsersSucceed(res.data))
      }).catch(error=>{
        dispatch(fetchUsersError({error}))
      })
    }
  },[dispatch,state]);

  return {
    users,
    error,
    loading,
    add,
    update
  }
}