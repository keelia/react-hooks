import { useCallback, useEffect, useState } from "react";
export const useAsync = (asyncFunc)=>{
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const execute = useCallback(()=>{
        setLoading(true)
        asyncFunc().then(response=>{
            setData(response)
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
            setError(err)
        })
    },[asyncFunc])
    return {data,loading,error,execute}
}

const getPosition = ()=>{
    return {
        x:document.documentElement.scrollLeft,
        y:document.documentElement.scrollTop
    }
}

export const useScroll = ()=>{
    const [position, setPosition] = useState(getPosition()); 
    const handler = useCallback(()=>{
        setPosition(getPosition())
    },[])
    useEffect(()=>{
        document.addEventListener('scroll',handler)
        return ()=>{
            document.removeEventListener("scroll",handler)
        }
    },[handler])
    return position
}


const getLocalstorage = (itemKey)=>{
    return window.localStorage.getItem(itemKey)
}
export const useLocalStorage = (itemKey)=>{
    // storage event works only when the same application opened in two browser tabs 
    // (it is used to exchange info between different tabs of the same app). 
    // Storage event will not fire when both components shown on the same page.
    const [value,setValue] = useState(getLocalstorage(itemKey))
    const handler = useCallback(()=>{
        setValue(getLocalstorage(itemKey))
    },[itemKey])
    useEffect(()=>{
        window.addEventListener('storage',handler)
        return ()=>{
            window.removeEventListener('storage',handler)
        }
    },[itemKey,handler])
    return value
}
const getCookies = async (key,setter)=>{
    try {
        const cookie = await window.cookieStore.get(key);
        if (cookie) {
            setter(cookie.value)
            console.log(`Found ${cookie.name} cookie: ${cookie.value}`);
    } else {
        console.log('Cookie not found');
    }
    } catch (error) {
      console.error(`Cookie store error: ${error}`);
    }
}

export const setCookies = async (key,value)=>{
    try {
        await window.cookieStore.set(key, value);
    } catch (error) {
        console.error(`Failed to set cookie: ${error}`);
    }
}

export const deleteCookies = async (key)=>{
    try {
        await window.cookieStore.delete(key);
      } catch (error) {
        console.error(`Failed to delete cookie: ${error}`);
      }
}
export const useCookies = (key)=>{
    const [value,setValue] = useState(null)
    const handler = useCallback(event => {
        console.log(`${event.changed.length} changed cookies`,event.changed);
        for (const cookie of event.changed){
            console.log(`Cookie ${cookie.name} changed to ${cookie.value}`);
            if(cookie.name === key){
                setValue(cookie.value)
            }
        }
        for (const cookie of event.deleted){
            console.log(`Cookie ${cookie.name} deleted`);
            if(cookie.name === key){
                setValue(null)
            }
        }
    },[key])

    useEffect(()=>{
        getCookies(key,setValue)
    },[key])

    useEffect(()=>{
        window.cookieStore.addEventListener('change',handler );
        return ()=>{
            window.cookieStore.removeEventListener('change',handler)
        }
    },[key,handler])

    return value
}