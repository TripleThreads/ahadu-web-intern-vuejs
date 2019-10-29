import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate'
import contact from "./contact"

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
        stateMessage: "",
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
    },
    modules: {
        contact
    }
});