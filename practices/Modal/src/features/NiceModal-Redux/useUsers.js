import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,updateUser,fetchUsersError,fetchUsersSucceed,fetchingUsers } from './usersActions';
import APIClient from '../../APIClient';

//create thunk to combine different actions
export const fetchUsers = ()=>(dispatch,getState)=>{
  const isLoading = getState().users?.loading;
  if(!isLoading){
    dispatch(fetchingUsers())
    APIClient.get(`users`).then(res=>{
      dispatch(fetchUsersSucceed(res.data))
    }).catch(error=>{
      dispatch(fetchUsersError({error}))
    })
  }
}

export const useUsers= ()=>{
  const dispatch = useDispatch();

  const users = useSelector(s=>s.users?.users);
  const loading = useSelector(s=>s.users?.loading);
  const error = useSelector(s=>s.users?.error);

  const add = useCallback((user)=>{
    dispatch(addUser(user))
  },[dispatch]);
  const update = useCallback((user)=>{
    dispatch(updateUser(user))
  },[dispatch]);

  useEffect(()=>{
    dispatch(fetchUsers())
  },[dispatch])
  return {
    users,
    error,
    loading,
    add,
    update
  }
}