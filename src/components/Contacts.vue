<template>

    <v-card class="mx-auto d-sm-block" max-width="500">

        <v-dialog
                v-model="dialog"
                max-width="290"
        >

            <v-card>
                <v-card-title class="headline">Delete confirmation</v-card-title>

                <v-card-text>
                    Are you sure you want to permanently delete this contact?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                            color="red darken-1"
                            text
                            @click="deleteContact"
                    >
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
            ></v-text-field>

        </v-toolbar>

        <v-container fluid>
            <v-row dense>
                <v-col
                        v-for="contact in this.$store.getters.getContacts"
                        :key="contact.id"
                        :cols="6"
                >
                    <v-card>
                        <v-img
                                :src="'http://localhost:3000/uploads/' + contact.photo"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="200px"
                        >
                            <v-card-title v-text="contact.name" class="caption"></v-card-title>
                            <v-card-title v-text="contact.phone_number" class="body-2"></v-card-title>
                        </v-img>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn icon @click="getId(contact.id)">
                                <v-icon>mdi-heart</v-icon>
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
        </v-container>
    </v-card>
</template>

<script>

    import ajax from "../ajax";
    import {router} from '../route';
    import {store} from "../store/store";

    export default {
        data: () => ({
            id : '',
            dialog: false,
        setContacts: (state, payload) => {
            state.contacts = payload;
        }
        }),
        methods: {
            deleteContact() {
                this.dialog = false;
                ajax.delete("contacts/" + this.id)
                    .then(
                        () => {
                            this.$store.dispatch("setContacts");
                        },
                        error => {
                            console.log(error);
                        }
                    )
            },
            getId(id) {
                this.id = id;
            },
            updateContact(contact) {
                store.dispatch("setContact", contact);
                router.push("/update/" + contact.name);
            }
        }
    }
</script>