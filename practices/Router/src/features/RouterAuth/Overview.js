import { BrowserRouter, Switch, Route,Link } from "react-router-dom";
import { Button } from "antd";
import { useState } from "react";

const UserLogin = ({loggedIn,setLoggedIn})=>{
    return  (<div>
            {loggedIn ? <><p>You're logged in !</p><Button onClick={e=>setLoggedIn(false)}>Logout</Button></> : <Button onClick={e=>setLoggedIn(true)}>Login</Button>}
        </div>)
}
export const Overview = ()=>{
    const [loggedIn,setLoggedIn] = useState(false);
    const PUBLIC_ROUTES = [
        {
            path:'/routerAuth',//every path under routeAuth will show unauth, easy for user go back to previous page after logged in.
            component:props=>'Unauth page'
        }
    ]
    const routes = loggedIn ? [
        {
            path:'/routerAuth/authed/1',
            component:props=>'Authed page1'
        },
        {
            path:'/routerAuth/authed/2',
            component:props=>'Authed page2'
        }
    ] : PUBLIC_ROUTES
    return (<>
        <header>
            <h1>Welcome</h1>
            <UserLogin loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </header>
        <div className="container">
            <BrowserRouter>
            <aside>
                <Link to="/routerAuth/authed/1">Page 1</Link>
                <Link to="/routerAuth/authed/2">Page 2</Link>
            </aside>
            <main>
                <Switch>
                    {routes.map(route=>(<Route key={route.path} path={route.path} component={route.component} />))}
                </Switch>
            </main>
            </BrowserRouter>
        </div>
    </>)
}