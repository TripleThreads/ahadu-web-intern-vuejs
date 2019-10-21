import {store} from "./store/store";
import {router} from "./route";

export const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/')
};

export const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        if (to.path === "/") {
            store.dispatch("setContacts", {"userId": store.getters.getUserId, "paginate": 0}).then();
        }
        if (to.path === "/add-contact") {
            store.dispatch("setContact", []).then();

            // let us change the token here and force the user to re login
            store.dispatch("setApiToken", 1).then();
        }
        store.dispatch("resetMessage").then();
        next();
        return
    }
    store.dispatch("setStateMessage", "Please login first").then();
    next('/login')
};

export const isAuthorizationError = error => {

    if (error.toString().indexOf("401") !== -1) {
        router.push('/login').then(() => {
            store.dispatch("setStateMessage", "Some data has changed please re login.").then()
        });
    }

};
