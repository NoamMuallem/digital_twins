import React, {useState} from 'react';
import {userBoundery} from "./interfaces"
import './App.css';
import Navbar from "./components/ui/navbar"

function App() {
    const [user, setUser] = useState<userBoundery|null>(null)
    return (
        <Navbar user={user} setUser={setUser}>
            <div>
                Test
                {user && 
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <span>new user added (you can check in postman admin- get all users)</span>
                        <span>the username is: {user.username}</span>
                        <span>the role is: {user.role}</span>
                        <span>the avatar is: {user.avatar}</span>
                        <span>the email is: {user.userId.email}</span>
                        <span>the space is: {user.userId.space}</span>
                    </div>
                }
            </div>
            </Navbar>
  );
}

export default App;
