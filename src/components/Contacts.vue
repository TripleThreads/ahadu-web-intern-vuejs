<template>

    <v-card class="mx-auto d-sm-block" max-width="500">

        <v-dialog v-model="dialog" max-width="290">

            <v-card>
                <v-card-title class="headline">Delete confirmation</v-card-title>

                <v-card-text>
                    Are you sure you want to permanently delete this contact?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="dialog = false">
                        Cancel
                    </v-btn>

                    <v-btn color="red darken-1" text @click="deleteContact">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-toolbar color="blue darken-2" dark>
            <v-toolbar-title>Contacts list</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-text-field
                    append-icon="mdi-magnify"
                    class="mx-4"
                    flat
                    hide-details
                    label="Search"
                    solo-inverted
                    v-model="searchInput"
                    @change="filteredClients"
            ></v-text-field>

            <v-btn icon @click="favorite_only = !favorite_only">
                <v-icon :color="favorite_only ? 'red': 'white'">mdi-heart</v-icon>
            </v-btn>

        </v-toolbar>

        <v-container fluid>
            <v-row dense>
                <v-col
                        v-for="contact in filteredClients"
                        :key="contact.id"
                        :cols="6">
                    <v-card>
                        <v-img
                                :src="'http://localhost:3000/uploads/' + contact.photo"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="200px" @click="contact_details(contact)">

                            <v-card-title v-text="contact.name" class="caption"></v-card-title>
                            <v-card-title v-text="contact.phone_number" class="body-2"></v-card-title>
                        </v-img>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn icon @click="makeFavorite(contact)">
                                <v-icon :color="contact.is_favorite ? 'red' : 'grey'">mdi-heart</v-icon>
                            </v-btn>

                            <v-btn icon @click="updateContact(contact)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>

                            <v-btn icon @click="getId(contact.id)">
                                <v-icon>mdi-share-variant</v-icon>
                            </v-btn>

                            <v-btn icon @click.stop="dialog = true, getId(contact.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <div class="text-center">
                <v-pagination
                        v-model="page"
                        :length="4"
                        circle
                        @input="paginate"
                ></v-pagination>
            </div>
        </v-container>
    </v-card>
</template>

<script>

    import ajax from "../ajax";
    import {router} from '../route';
    import {store} from "../store/store";
    import { isAuthorizationError } from "../auth";

    export default {
        data: () => ({
            id: '',
            dialog: false,
            searchInput: '',
            favorite_only: false,
            page: 1
        }),
        methods: {
            deleteContact() {
                this.dialog = false;
                ajax.delete("contacts/" + this.id)
                    .then(
                        () => {
                            store.dispatch("setContacts", store.getters.getUserId);
                        },
                        error => {
                            isAuthorizationError(error);
                        }
                    )
            },
            getId(id) {
                this.id = id;
            },
            updateContact(contact) {
                store.dispatch("setContact", contact);
                router.push("/update/" + contact.name);
            },
            makeFavorite(contact) {
                contact.is_favorite = !contact.is_favorite;

                ajax.put("contacts/" + contact.id, contact)
                    .then(
                        () => {
                            this.$store.dispatch("setContacts", store.getters.getUserId);
                        },
                        error => {
                            isAuthorizationError(error);
                        }
                    )
            },
            contact_details(contact) {
                store.dispatch("setContact", contact);
                router.push('/contact/' + contact.id)
            },
            paginate(page) {
                store.dispatch('setContacts', {"userId": store.getters.getUserId, "paginate": --page});
            }
        },
        computed: {
            filteredClients() {
                const search = this.searchInput.toLowerCase().trim();

                let contacts = store.getters.getContacts;

                if (this.favorite_only) contacts = contacts.filter(c => c.is_favorite);

                if (!search) return contacts;

                return contacts.filter(c => c.name.toLowerCase().indexOf(search) > -1);
            },

        }
    }
</script>