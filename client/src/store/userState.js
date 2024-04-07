import { makeObservable, observable, action } from 'mobx';
class UserState {

    currentUser = {};
    isAuth = false;

    constructor() {
        makeObservable(this, {
            currentUser: observable,
            isAuth: observable,
            setUser: action,
            logout: action
        });
    }

    setUser(user) {
        this.currentUser = user;
        this.isAuth = true;
    }

    logout() {
        localStorage.removeItem('token');
        this.currentUser = {};
        this.isAuth = false;
    }
}


const userState = new UserState();
export default userState;

