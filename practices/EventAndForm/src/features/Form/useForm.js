import { useCallback, useState } from 'react';

export const useForm= (initialValue,validators)=>{
  const [values,setValues] = useState(initialValue);
  const [errors,setErrors] = useState({});
  const setField = useCallback((name,value)=>{
    setValues(prev=>({
        ...prev,
        [name]:value
    }))
    if(validators){
      const errMsg = validators[name](value)
      setErrors(prev=>({
        ...prev,
        [name]:errMsg || null
      }))
    }
  },[])
  return {values,errors,setField}
}