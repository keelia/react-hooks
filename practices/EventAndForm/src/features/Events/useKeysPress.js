import { useEffect, useMemo, useState } from 'react';

export const useKeysPress= (domNode = document.body,keyCount = 2)=>{
  const [keys,setKeys] = useState([]);
  useEffect(()=>{
    const handleKeyDown = evt=>{
      setKeys(prev=>{
        return prev.some(key=>key === evt.key) ? prev : [...prev.slice(1-keyCount),evt.key]
      })
    }
    const handleKeyUp = evt=>{
      setKeys(prev=>{
        return prev.filter(key=>key!==evt.key)
      })
    }
    domNode.addEventListener('keydown',handleKeyDown)
    domNode.addEventListener('keyup',handleKeyUp)
    return ()=>{
        domNode.removeEventListener('keydown',handleKeyDown)
        domNode.removeEventListener('keyup',handleKeyUp)
    }
  },[domNode,keyCount])
  return useMemo(()=>{
    return keys.length === keyCount ? keys:[]
  },[keys,keyCount])
}