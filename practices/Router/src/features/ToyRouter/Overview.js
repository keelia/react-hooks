import {ToyRouter,ToyRoute,ToyRouteLink} from "./ToyRouter";

export const Overview = ({routes = []})=>{
    return (<>
        <header><h1>Welcome</h1></header>
        <div className="container">
            <aside>
                {routes.map(route=>(<ToyRouteLink key={route.path} label={route.label} path={route.path} />))}
            </aside>
            <main>
                <ToyRouter>
                    {routes.map(route=><ToyRoute {...route} key={route.path} path={route.path} component={route.component}/>)}
                </ToyRouter>
            </main>
        </div>
    </>)
}
