import User from "../model/user";

export default class UserSession {
    public user: User | undefined;
    public authenticated: boolean;
    constructor() {
        this.authenticated = false;
    }

    login(user: User) {
        if (user) {
            this.user = user;
            this.authenticated = true;
        }
    }

    logout() {
        this.user = undefined;
        this.authenticated = false;
    }
}