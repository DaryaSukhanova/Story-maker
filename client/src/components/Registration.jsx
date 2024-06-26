import React, {useState} from 'react';
import Input from "./Input";
import {registration} from "../actions/user";
import {NavLink} from "react-router-dom";
import "../styles/registration.scss"

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="registration">
            <div className="registration__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
            <button onClick={()=> registration(email, password)} className="registration__btn">Зарегестрироваться</button>
            <div className="link">Есть аккаунт? <NavLink to="/login">Войдите!</NavLink></div>
        </div>
    );
};

export default Registration;