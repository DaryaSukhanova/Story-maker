import {makeAutoObservable} from "mobx";

const defaultState = {
    currentUser: {},
    isAuth: false
}
class userState{
    user = defaultState.currentUser
    isAuth = defaultState.isAuth
    constructor() {
        makeAutoObservable(this)
    }
}