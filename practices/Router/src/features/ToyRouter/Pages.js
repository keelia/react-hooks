import { ToyRoute, ToyRouter,ToyRouteLink } from "./ToyRouter"

export const PAGE1_ROUTES = [
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
export const PAGE2_ROUTES = [
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
    return (
        <>
            <h2>Page1</h2>
            <div className="subHeader">
                {PAGE1_ROUTES.map(route=>(<ToyRouteLink key={route.path} label={route.label} path={'page1/'+route.path} />))}
            </div>
            <ToyRouter>
                {PAGE1_ROUTES.map(route=>(<ToyRoute  key={route.path} path={route.path} component={route.component}/>))}
            </ToyRouter>
        </>
    )
}
export const Page2 = props=>{
    return (
        <>
            <h2>Page2</h2>
            <div className="subHeader">
                {PAGE2_ROUTES.map(route=>(<ToyRouteLink key={route.path} label={route.label} path={'page2/'+route.path} />))}
            </div>
            <ToyRouter >
                {PAGE2_ROUTES.map(route=>(<ToyRoute  key={route.path} path={route.path} component={route.component}/>))}
            </ToyRouter>
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
        path:'page1',
        component:Page1,
        children:PAGE1_ROUTES
    },
    {
        label:'Page2',
        path:'page2',
        component:Page2,
        children:PAGE2_ROUTES
    },
    {
        label:'Page3',
        path:'page3',
        component:Page3,
    },
    {
        label:'Page4',
        path:'page4',
        component:Page4,
    }
]