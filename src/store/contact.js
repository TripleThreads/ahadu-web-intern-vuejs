import ajax from "../ajax";
import {handleError} from "../error-handler";
import {CONTACTS_PER_PAGE} from "./store";
/**
 * this file is holds our contact data, split from store.js for modularity
 * */
const state = {
    contacts: [],
    contactsCount: 0,
    contact: []
};

const getters = {
    getContacts: state => {
        return state.contacts;
    },
    getContact: state => {
        return state.contact;
    },
    getContactsCount: state => {
        return state.contactsCount;
    }
};

const mutations = {
    setContacts: (state, payload) => {
        state.contacts = payload;
    },
    setContact: (state, payload) => {
        state.contact = payload;
    },
    setContactsCount: (state, payload) => {
        state.contactsCount = payload;
    }
};

const actions = {
    setContacts: ({commit}, {userId, paginate}) => {

        ajax.get(`/users/${userId}/contacts?filter[limit]=${CONTACTS_PER_PAGE}&filter[skip]=${paginate * CONTACTS_PER_PAGE}`)
            .then(response => {
                commit("setContacts", response.data);

                ajax.get('/contacts/count').then(response => {
                    commit("setContactsCount", response.data.count);
                });
            }, error => {
                handleError(error);
            });

    },
    setContact: ({commit}, payload) => {
        commit("setContact", payload);
    }
};

export default  {
    state,
    getters,
    mutations,
    actions
}