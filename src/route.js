import Vue from 'vue'
import VueRouter from 'vue-router';
import {ifAuthenticated, ifNotAuthenticated} from './auth';

// lazy loading components
const Contacts = () => import("./components/Contacts");
const AddContact = () => import("./components/AddContact");
const ContactDetails = () => import( "./components/ContactDetails");
const Login = () => import("./components/Login");
const Register = () => import("./components/Register");
const EditContact = () => import("./components/EditContact");

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        {path: '', component: Contacts, beforeEnter: ifAuthenticated},
        {path: '/add-contact', component: AddContact, beforeEnter: ifAuthenticated},
        {path: '/update/:name', component: EditContact, beforeEnter: ifAuthenticated},
        {path: '/login', component: Login, beforeEnter: ifNotAuthenticated},
        {path: '/register', component: Register, beforeEnter: ifNotAuthenticated},
        {path: '/contact/:id', component: ContactDetails, beforeEnter: ifAuthenticated},
    ]
});