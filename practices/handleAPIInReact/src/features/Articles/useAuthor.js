import { useEffect, useState } from 'react';
import APIClient from './APIClient'

const useAuthor = (authorId)=>{
  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    if(!authorId){
      return
    }
    //reset states when re-fetch data
    setLoading(true)
    setData(null)
    setError(null)
    APIClient.get(`authors/${authorId}`).then(res=>{
      setData(res.data)
      setLoading(false)
    }).catch(err=>{
      setError(err)
      setLoading(false)
    })
  },[authorId])
  return {
    data,
    error,
    loading
  }
}

export default useAuthor
