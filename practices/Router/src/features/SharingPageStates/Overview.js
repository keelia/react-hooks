import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TabsPage } from "./TabsPage";

export const Overview = ()=>{
    return (<>
        <header><h1>Welcome</h1></header>
        <div className="container">
            <BrowserRouter>
            <main>
                <Switch>
                    <Route path="/:activeTab" component={TabsPage} />
                    <Route component={TabsPage}/>
                </Switch>
            </main>
            </BrowserRouter>
        </div>
    </>)
}