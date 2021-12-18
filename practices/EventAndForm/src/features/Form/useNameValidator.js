import { useState,useCallback } from 'react';
import APIClient from '../../APIClient'

const useNameValidator = ()=>{
  const [error,setError] = useState(null);
  const [validating,setValidating] = useState(false);
  const validator = useCallback((name)=>{
    setValidating(true)
    setError(null)
    return APIClient.get('names').then(resp=>{
          setValidating(false)
          return {
              error:resp.data.some(exist=>exist.name === name),
              errMsg:'Name already exists'
          }
    }).catch(err=>{
      setError(err)
      setValidating(false)
      return {
        error:false,
        errMsg:'Name already exists'
      }
    })
  },[])

  return {
    error,
    validating,
    validator
  }
}
export default useNameValidator

