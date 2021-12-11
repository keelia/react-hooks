import { useEffect, useState } from 'react';
import APIClient from './APIClient'

export const useArticles= ()=>{
  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    //reset states when re-fetch data
    setLoading(true)
    setData(null)
    setError(null)
    APIClient.get(`articles`).then(res=>{
      setData(res.data)
      setLoading(false)
    }).catch(err=>{
      setError(err)
      setLoading(false)
    })
  },[])
  return {
    data,
    error,
    loading
  }
}