import { useCallback, useState } from 'react';

export const useForm= (initialValue={},validators={},asyncValidators={})=>{
  const [values,setValues] = useState(initialValue);
  const [errors,setErrors] = useState({});
  const setField = useCallback(async (name,value)=>{
    setValues(prev=>({
        ...prev,
        [name]:value
    }))
    if(validators[name]){
      const {error,errMsg} = validators[name](value);
      setErrors(prev=>{
        return {
          ...prev,
          [name]:error ? (!prev[name]?.includes(errMsg) ? [...(prev[name] || []),errMsg] : prev[name])
           : (prev[name]?.includes(errMsg) ? prev[name].filter(exist=>exist!==errMsg) : prev[name])
        }
      })
    }
    if(asyncValidators[name]){
      const {error,errMsg} = await asyncValidators[name](value);
      setErrors(prev=>({
        ...prev,
        [name]:error ? (!prev[name]?.includes(errMsg) ? [...(prev[name] || []),errMsg] : prev[name])
        : (prev[name]?.includes(errMsg) ? prev[name].filter(exist=>exist!==errMsg) : prev[name])
      }))
    }
  },[asyncValidators,validators])

  const reset = useCallback(()=>setValues(initialValue),[initialValue])
  return {values,errors,setField,reset}
}