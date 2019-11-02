/*
* this handler is modularized since the errors are common
* when an error thrown from a server we will check the error type and the appropriate response for it
* */
import {router} from "./route";
import {store} from "./store/store";

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
