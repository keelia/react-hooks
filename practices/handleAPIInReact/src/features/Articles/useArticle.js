import { useEffect, useState } from 'react';
import APIClient from './APIClient'

const useArticle = (id)=>{
  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    //reset states when re-fetch data
    console.log('fetch article',id)
    setLoading(true)
    setData(null)
    setError(null)
    APIClient.get(`articles/${id}`).then(res=>{
      setData(res.data)
      setLoading(false)
    }).catch(err=>{
      setError(err)
      setLoading(false)
    })
  },[id])
  return {
    data,
    error,
    loading
  }
}
export default useArticle