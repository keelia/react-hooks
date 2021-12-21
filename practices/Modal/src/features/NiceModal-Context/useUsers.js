import { useCallback } from 'react';
import { useEffect, useState,createContext } from 'react';
import APIClient from '../../APIClient'

export const UsesrContext = createContext();

export const useUsers= ()=>{
  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const addUser = useCallback((user)=>{
    setData(prev=>([...prev,user]))
  },[])

  const updateUser = useCallback((user)=>{
    setData(prev=>(prev.map(u=>u.id === user.id ? user:u)))
  },[])

  useEffect(()=>{
    setLoading(true)
    setData(null)
    setError(null)
    APIClient.get(`users`).then(res=>{
      setData(res.data)
      setLoading(false)
    }).catch(err=>{
      setError(err)
      setLoading(false)
    })
  },[])
  return {
    users:data,
    error,
    loading,
    addUser,
    updateUser
  }
}