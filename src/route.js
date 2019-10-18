import Vue from 'vue'
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import VueRouter from 'vue-router';
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import Register from "./components/Register";
import {store} from "./store/store"

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        if (to.path === "/") {
            store.dispatch("setContacts");
        }
        if (to.path === "/add-contact") {
            store.dispatch("setContact", []);
        }
        store.dispatch("resetMessage");
        next();
        return
    }
    store.dispatch("setStateMessage", "Please login first");
    next('/login')
};


export const router = new VueRouter({
    mode: "history",
    routes: [
        {path: '', component: Contacts, beforeEnter: ifAuthenticated},
        {path: '/add-contact', component: AddContact, beforeEnter: ifAuthenticated},
        {path: '/update/:name', component: AddContact, beforeEnter: ifAuthenticated},
        {path: '/favorites', component: Favorites, beforeEnter: ifAuthenticated},
        {path: '/login', component: Login, beforeEnterAuthenticated: ifNotAuthenticated},
        {path: '/register', component: Register, beforeEnter: ifNotAuthenticated},
    ]
});