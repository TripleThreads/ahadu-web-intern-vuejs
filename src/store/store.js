import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate'
import contact from "./contact"
import messages from "./messages";

Vue.use(Vuex);

/**
 * this file is our storage unit, it is vuex you know
 * */

export const CONTACTS_PER_PAGE = 4; // number of contacts per page for a pagination

export const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            paths: ['apiToken', 'userId'],
        })
    ],
    state: {
        apiToken: "",
        userId: "",
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
    },
    mutations: {
        setApiToken: (state, payload) => {
            state.apiToken = payload;
        },
        setUserId: (state, payload) => {
            state.userId = payload;
        },
        resetApiToken: (state) => {
            state.apiToken = "";
        },
    },
    actions: {
        setApiToken: ({commit}, payload) => {
            commit('setApiToken', payload.token);
            commit('setUserId', payload.id)
        },
        resetApiToken: ({commit}) => {
            commit("resetApiToken");
        },
    },
    modules: {
        contact,
        messages
    }
});