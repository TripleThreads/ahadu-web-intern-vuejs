import Vue from 'vue';
import Vuex from 'vuex';
import ajax from "../ajax";
import {router} from "../route";
import { isAuthorizationError} from "../auth";

Vue.use(Vuex);

/**
 * this file is our storage unit, it is vuex you know
 * */

const CONTACTS_PER_PAGE = 4; // number of contacts per page for a pagination

export const store = new Vuex.Store({
    state: {
        apiToken: "",
        userId: "",
        stateMessage: "",
        contacts: [],
        contact: []
    },
    getters: {
        getApiToken: state => {
            return state.apiToken;
        },
        getUserId: state => {
            return state.userId;
        },
        isAuthenticated: state => {
            return !(state.apiToken === "");
        },
        getMessage: state => {
            return state.stateMessage;
        },
        getContacts: state => {
            return state.contacts;
        },
        getContact: state => {
            return state.contact;
        }
    },
    mutations: {
        setApiToken: (state, payload) => {
            state.apiToken = payload;
        },
        setUserId: (state, payload) => {
            state.userId = payload;
        },
        setStateMessage: (state, payload) => {
            state.stateMessage = payload;
        },
        resetMessage: (state) => {
            state.stateMessage = "";
        },
        resetApiToken: (state) => {
            state.apiToken = "";
        },
        setContacts: (state, payload) => {
            state.contacts = payload;
        },
        setContact: (state, payload) => {
            state.contact = payload;
        }
    },
    actions: {
        setApiToken: ({commit}, payload) => {
            commit('setApiToken', payload.token);
            commit('setUserId', payload.id)
        },
        setStateMessage: ({commit}, payload) => {
            commit('setStateMessage', payload);
        },
        resetMessage: ({commit}) => {
            commit("resetMessage");
        },
        resetApiToken: ({commit}) => {
            commit("resetApiToken");
        },
        setContacts: ({commit}, {userId, paginate}) => {

            ajax.get(`/users/${userId}/contacts?filter[limit]=${CONTACTS_PER_PAGE}&filter[skip]=${paginate * CONTACTS_PER_PAGE}`)
                .then(response => {
                    commit("setContacts", response.data);
                }, error => {
                   isAuthorizationError(error);
                });

        },
        setContact: ({commit}, payload) => {
            commit("setContact", payload);
        }
    }
});