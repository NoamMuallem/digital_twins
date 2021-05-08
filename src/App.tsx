import React, { useState } from "react";
import { userBoundery } from "./interfaces";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Items from "./components/items/item.component";

function App() {
    const [user, setUser] = useState<userBoundery | null>(null);
    return (
        <Navbar user={user} setUser={setUser}>
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/items"
                        render={() => <Items user={user} />}
                    />
                    {/*<Route path="/items/:id" render={()=>{user && }} />
                    <Route path="/new_item" render={()=>{user && }} />*/}
                </Switch>
            </Router>
        </Navbar>
    );
}

export default App;
