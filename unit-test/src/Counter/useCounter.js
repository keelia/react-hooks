import { useCallback, useState } from "react"

export default ()=>{
    const [counter,setCounter] = useState(0);
    const decrement = useCallback((count = 1)=>{
        setCounter(c=>isNaN(c-parseInt(count,10)) ? c: c - parseInt(count,10))
    },[])
    const increment = useCallback((count = 1)=>{
        setCounter(c=>isNaN(c+parseInt(count,10)) ? c : c+parseInt(count,10))
    },[])
    return{
        counter,
        decrement,
        increment
    }
}