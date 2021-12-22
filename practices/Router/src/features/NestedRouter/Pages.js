import { Switch, Route, Link,useRouteMatch } from "react-router-dom";

const PAGE1_ROUTES = [
    {
        label:'General',
        path:'general',
        component:props=>'General'
    },
    {
        label:'Profile',
        path:'profile',
        component:props=>'Profile'
    },
    {
        label:'Email',
        path:'email',
        component:props=>'Email'
    }
]
const PAGE2_ROUTES = [
    {
        label:'Articles',
        path:'articles',
        component:props=>'Articles'
    },
    {
        label:'Comments',
        path:'comments',
        component:props=>'Comments'
    }
]

export const Page1 = props=>{
    const match = useRouteMatch();
    return (
        <>
            <h2>Page1</h2>
            <div className="subHeader">
                {PAGE1_ROUTES.map(route=>(<Link key={route.path} to={`${match.url}/${route.path}`}>{route.label}</Link>))}
            </div>
            <Switch>
                {PAGE1_ROUTES.map(route=>(<Route key={route.path} path={`${match.url}/${route.path}`} component={route.component}/>))}
                <Route component={PAGE1_ROUTES[0]?.component}/>
            </Switch>
        </>
    )
}
export const Page2 = props=>{
    const match = useRouteMatch();
    return (
        <>
            <h2>Page2</h2>
            <div className="subHeader">
                {PAGE2_ROUTES.map(route=>(<Link key={route.path} to={`${match.url}/${route.path}`}>{route.label}</Link>))}
            </div>
            <Switch>
                {PAGE2_ROUTES.map(route=>(<Route key={route.path} path={`${match.url}/${route.path}`} component={route.component}/>))}
                <Route component={PAGE2_ROUTES[0]?.component}/>
            </Switch>
        </>
    )
}
export const Page3 = props=>{
    return 'Page3'
}
export const Page4 = props=>{
    return 'Page4'
}

export const ROUTES = [
    {
        label:'Page1',
        path:'/page1',
        component:Page1,
        children:PAGE1_ROUTES
    },
    {
        label:'Page2',
        path:'/page2',
        component:Page2,
        children:PAGE2_ROUTES
    },
    {
        label:'Page3',
        path:'/page3',
        component:Page3,
    },
    {
        label:'Page4',
        path:'/page4',
        component:Page4,
    }
]