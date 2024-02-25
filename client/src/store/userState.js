import { makeObservable, observable, action } from 'mobx';
class UserStore {
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

const userStore = new UserStore();
export default userStore;