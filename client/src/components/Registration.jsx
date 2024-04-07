import React, {useState} from 'react';
import Input from "./Input";
import {registration} from "../actions/user";
import "../styles/registration.scss"

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="registration">
            <div className="registration__header">Registration</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter password"/>
            <button onClick={()=> registration(email, password)} className="registration__btn">Sign In</button>
        </div>
    );
};

export default Registration;