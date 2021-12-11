import { useEffect, useState } from 'react';
import APIClient from './APIClient'

const useComments = (articleId)=>{
  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    //reset states when re-fetch data
    setLoading(true)
    setData(null)
    setError(null)
    APIClient.get(`comments/?articleId=${articleId}`).then(res=>{
      setData(res.data)
      setLoading(false)
    }).catch(err=>{
      setError(err)
      setLoading(false)
    })
  },[articleId])
  return {
    data,
    error,
    loading
  }
}
export default useComments