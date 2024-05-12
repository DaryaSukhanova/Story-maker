import React, {useState} from 'react';
import Input from "./Input";
import {login} from "../actions/user";
import userState from "../store/userState";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import "../styles/registration.scss"

const Login = observer(() => {
    const isAuth = userState.isAuth
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="authorization">
            <div className="authorization__header">Авторизация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
            <button onClick={()=> login(email, password)} className="authorization__btn">Войти</button>
            <div className="link">Нет аккаунта? <NavLink to="/registration">Зарегистрируйтесь!</NavLink></div>
        </div>
    );
});

export default Login;