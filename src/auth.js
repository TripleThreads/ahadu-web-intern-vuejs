import {store} from "./store/store";
import {router} from "./route";
import {Contact} from "./models/contact";

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
            if (Contact.name !== undefined) {
                for (let member in Contact) delete Contact[member];
            }
        }
        store.dispatch("resetMessage").then();
        next();
        return
    }
    store.dispatch("setStateMessage", "Please login first").then();
    next('/login')
};

export const isAuthorizationError = error => {

    let error_msg = error.toString();

    if (error_msg.indexOf("401") !== -1) {
        router.push('/login').then(() => {
            store.dispatch("setStateMessage", "Some data has changed please re login.").then()
        });
    }
    else if (error_msg.indexOf("Network Error") !== -1) {
        store.dispatch("setStateMessage", "Network error, please check your connection.").then()
    }

};
