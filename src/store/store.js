import Vue from 'vue';
import Vuex from 'vuex';
import ajax from "../ajax";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        apiToken: "",
        stateMessage: "",
        contacts: [],
        contact: []
    },
    getters: {
        getApiToken: state => {
            return state.apiToken;
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
            commit('setApiToken', payload);
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
        setContacts: ({commit}) => {

            ajax.get("http://localhost:3000/contacts").then(response => {
                console.log(response.data);
                commit("setContacts", response.data);
            }, error => {
                console.log(error);
            });

        },
        setContact: ({commit}, payload) => {
            commit("setContact", payload);
        }
    }
});