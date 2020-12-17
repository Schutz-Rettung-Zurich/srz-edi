import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./pages/Home"
import Filter from "./pages/Filter"
import Overview from "./pages/Overview";

function App() {
    return (
        <Router>
            <div className="size">
                <Switch>
                    <Route path="/overview">
                        <Overview/>
                    </Route>
                    <Route path="/filter">
                        <Filter/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
