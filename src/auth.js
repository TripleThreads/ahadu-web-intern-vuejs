import {store} from "./store/store";
import {router} from "./route";

/*
* this file handles an authentication that we need to check before a route executes
* */
export const ifNotAuthenticated = (to, from, next) => {

    store.dispatch("resetMessage").then();

    if (!store.getters.isAuthenticated) {
        next();
        return // return if not authenticated
    }

    next('/')
};

export const ifAuthenticated = (to, from, next) => {

    store.dispatch("resetMessage").then();

    if (store.getters.isAuthenticated) {

        if (to.path === "/") {
            store.dispatch("setContacts", {"userId": store.getters.getUserId, "paginate": 0}).then();
        }

        next();
        return
    }
    next('/login');
    store.dispatch("setStateMessage", "Please login first").then();
};

/*
* when an error returns from a server we will check the error type and the appropriate response for it
* */
export const handleError = error => {

    let error_msg = error.toString();

    // if it is authorization error
    if (error_msg.indexOf("401") !== -1) {
        router.push('/login').then(() => {
            store.dispatch("setStateMessage", "Some data has changed please re login.").then()
        });
    }
    // if it is network error i.e server is not responding
    else if (error_msg.indexOf("Network Error") !== -1) {
        store.dispatch("setStateMessage", "Network error, please check your connection.").then()
    }
    // if username already taken when user tries to register
    else if (error.response.statusText.indexOf("Conflict Username already taken") !== -1) {
        store.dispatch("setStateMessage", "Username already taken").then();
    }
};
