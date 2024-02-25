import React, {useState} from 'react';
import Input from "./Input";
import {login} from "../actions/user";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="authorization">
            <div className="authorization__header">Authorization</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password"/>
            <button onClick={()=> login(email, password)} className="authorization__btn">Log In</button>
        </div>
    );
};

export default Login;