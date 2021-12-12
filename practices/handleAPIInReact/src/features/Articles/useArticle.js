import { useCallback, useEffect, useState } from 'react';
import APIClient from '../APIClient'

const useArticle = (id,auto_execute = true)=>{
  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const execute = useCallback(()=>{
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
  useEffect(()=>{
    if(auto_execute){
      execute()
    }
  },[auto_execute,execute])
  return {
    data,
    error,
    loading,
    execute
  }
}
export default useArticle