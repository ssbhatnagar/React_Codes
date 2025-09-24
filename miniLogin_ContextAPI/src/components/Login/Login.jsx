import React, { useContext } from "react";
import { useState } from "react";
import UserContext from "../../context/UserContext.js";

function Login(){

    const[userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const {setUser} = useContext(UserContext);

    function handleLogin(){
         setUser({userName})
    }

    return(
        <div>
            <h1>Login</h1>
            <input 
            placeholder="Enter Username"
            value ={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
            <input
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            /> 
            <button onClick={handleLogin}>Login</button>
        </div>
    )

}
export default Login