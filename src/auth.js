import {store} from "./store/store";

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
