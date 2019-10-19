import Vue from 'vue';
import Vuex from 'vuex';
import ajax from "../ajax";

Vue.use(Vuex);

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
        setContacts: ({commit}, payload) => {
            ajax.get(`/users/${payload}/contacts`).then(response => {
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