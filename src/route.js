import Vue from 'vue'
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import ContactDetails from "./components/ContactDetails";
import VueRouter from 'vue-router';
import Login from "./components/Login";
import Register from "./components/Register";
import { ifAuthenticated, ifNotAuthenticated} from './auth';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        {path: '', component: Contacts, beforeEnter: ifAuthenticated},
        {path: '/add-contact', component: AddContact, beforeEnter: ifAuthenticated},
        {path: '/update/:name', component: AddContact, beforeEnter: ifAuthenticated},
        {path: '/login', component: Login, beforeEnterAuthenticated: ifNotAuthenticated},
        {path: '/register', component: Register, beforeEnter: ifNotAuthenticated},
        {path: '/contact/:id', component: ContactDetails, beforeEnter: ifAuthenticated},
    ]
});