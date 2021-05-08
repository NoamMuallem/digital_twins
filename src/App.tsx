import React, { useState } from "react";
import { ItemBoundary, userBoundery } from "./interfaces";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Items from "./components/items/item.component";
import UserProfile from "./components/user_profile/user_profile.component";

function App() {
    const [user, setUser] = useState<userBoundery | null>(null);
    const [items, setItems] = useState<Array<ItemBoundary>>([]);

    const addItemToState = (item: ItemBoundary) => {
        setItems((ls: Array<ItemBoundary>) => [...ls, item]);
    };

    return (
        <Router>
            <Navbar user={user} setUser={setUser}>
                <Switch>
                    <Route
                        path="/items"
                        render={() => (
                            <Items
                                user={user}
                                items={items}
                                setItems={setItems}
                                addItemToState={addItemToState}
                            />
                        )}
                    />
                    <Route
                        path="/user"
                        render={() => (
                            <UserProfile
                                user={user}
                                setUser={setUser}
                            />
                        )}
                    />
                    {/*<Route path="/items/:id" render={()=>{user && }} />
                    <Route path="/new_item" render={()=>{user && }} />*/}
                </Switch>
            </Navbar>
        </Router>
    );
}

export default App;
