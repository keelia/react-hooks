import { useEffect, useState } from 'react';

export const useKeyPress= (domNode = document.body)=>{
  const [key,setKey] = useState(null);
  useEffect(()=>{
        const handleKeyPress = evt=>setKey(evt.key)
        domNode.addEventListener('keypress',handleKeyPress)
        return ()=>{
            domNode.removeEventListener('keypress',handleKeyPress)
        }
  },[domNode])
  return key
}