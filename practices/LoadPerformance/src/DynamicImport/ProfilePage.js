import { useState } from "react"
function sleep(seconds){
    return new Promise(resolve=>setTimeout(resolve,seconds))
}
export const ProfilePage = props=>{
    const [RealPage,setRealPage] = useState(null);
    import('./RealProfilePage').then(async moduel=>{
        await sleep(1000)
        setRealPage(moduel)
    })
   return RealPage ? <RealPage.default /> : 'Loading'
}