
import { useLocation } from "react-use";
//for path/component declaration
export const ToyRoute = ()=>null

export const ToyRouter = ({children})=>{
    const routes = children.map(child=>child.props).reduce((a,c)=>({...a,[c.path]:{
        component : c.component
    }}),{})
    const location = useLocation();
    let matched = location.pathname.replace(/^(\/)/,'').split('/');
    matched = matched.find(seg=>routes[seg]?.component)
    const Page = routes[matched]?.component
    return Page ? <Page/> : null;
}

export const ToyRouteLink = ({label,path})=>{
    return <a href={`/${path}`}>{label}</a>
}