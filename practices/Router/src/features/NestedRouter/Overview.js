import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export const Overview = ({routes = []})=>{
    return (<>
        <header><h1>Welcome</h1></header>
        <div className="container">
            <BrowserRouter>
            <aside>
                {routes.map(route=>(<Link key={route.path} to={route.path}>{route.label}</Link>))}
            </aside>
            <main>
                <Switch>
                    {routes.map(route=><Route key={route.path} path={route.path} component={route.component}/>)}
                    <Route component={props=>(<h1>Welcome!</h1>)}/>
                </Switch>
            </main>
            </BrowserRouter>
        </div>
    </>)
}