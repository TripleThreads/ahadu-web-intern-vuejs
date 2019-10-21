<template class="mx-auto">
    <v-card class="mx-auto" max-width="344" outlined>
        <v-alert dense text dismissible :type="type" v-show="display_alert" v-text="this.$store.getters.getMessage">
            Successfully registered
        </v-alert>

        <v-toolbar color="blue darken-2" dark>
            <v-toolbar-title>Add new contact</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>

        <v-img
                :src="'http://localhost:3000/uploads/' + this.$store.getters.getContact.photo"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                v-show="show_img"
                height="200px"></v-img>

        <form class="my-4 mx-4">
            <v-text-field
                    v-model="contact.name"
                    label="Name"
                    required></v-text-field>

            <v-text-field
                    v-model="contact.phone_number"
                    label="Phone number"
                    :counter="10"
                    required></v-text-field>
            <v-row>
                <v-col>
                    <v-text-field
                            v-model="contact.city"
                            label="City"
                            :counter="10"
                            required></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                            v-model="contact.sub_city"
                            label="Sub city"
                            :counter="10"
                            required></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <v-text-field
                            v-model="contact.house_number"
                            label="House no."
                            :counter="10"
                            required></v-text-field>
                </v-col>

                <v-col cols="11" sm="8">
                    <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="date"
                            persistent
                            width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="contact.date_of_birth"
                                    label="Birthday date"
                                    prepend-icon="mdi-calendar"
                                    v-on="on"
                            ></v-text-field>
                        </template>

                        <v-date-picker v-model="contact.date_of_birth" scrollable
                                       :max="new Date().toISOString().substr(0, 10)"
                                       min="1950-01-01" ref="picker">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(contact.date_of_birth)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-col>
            </v-row>

            <v-btn class="ma-2 d-block mx-auto mb-4" large tile color="info" @click="$refs.file.click()">
                <v-icon left>mdi-camera</v-icon>
                {{ button_text }}
            </v-btn>

            <input type="file" accept="image/png, image/jpeg, image/bmp" v-show="false" ref="file"
                   @change="handleFileUpload"/>

            <input v-show="false" ref="inputUpload" type="file" @change="handleFileUpload">
            <div class="my-2 mx-auto align-center align-content-center">
                <v-btn color="success" class="d-block mx-auto" @click="submit" dark v-text="button_name"></v-btn>
            </div>
        </form>

    </v-card>
</template>

<script>
    import ajax from "../ajax";
    import {router} from "../route";
    import {store} from "../store/store";
    import { isAuthorizationError } from "../auth";

    export default {
        name: "AddContact",
        data() {
            return {
                contact: {
                    id: store.getters.getContact.id,
                    name: store.getters.getContact.name,
                    city: store.getters.getContact.city,
                    sub_city: store.getters.getContact.sub_city,
                    phone_number: store.getters.getContact.phone_number,
                    house_number: store.getters.getContact.house_number,
                    date_of_birth: this.is_create() ? '' : store.getters.getContact.date_of_birth.slice(0, 10),
                    file: ''
                },
                button_text: "upload Image",
                type: "success",
                menu: false,
                modal: false,
            }
        },
        methods: {

            submit() {

                let formData = new FormData();

                if (this.contact.file)
                    formData.append('photo', this.contact.file);

                Object.keys(this.contact).forEach((key) => {
                    if (key !== 'file')
                        formData.append(key, this.contact[key])
                });

                let self = this;

                if (this.is_create()) {
                    ajax.post(`users/${store.getters.getUserId}/contacts`,
                        formData,
                    ).then(function () {
                        self.showSuccess();
                    }, error => {
                        self.showError();
                        isAuthorizationError(error);
                    });
                } else {
                    formData.append('is_favorite', store.getters.getContact.is_favorite);
                    ajax.patch(`users/${store.getters.getUserId}/contacts`,
                        formData
                    ).then(() => {
                        router.push("/");
                    }, error => {
                        self.showError();
                        isAuthorizationError(error);
                    });
                }
            },

            handleFileUpload(e) {
                const filename = this.$refs.file.files[0].name;
                this.contact.file = this.$refs.file.files[0];
                this.button_text = filename.slice(0, 10);
                this.button_text += filename.length < 10 ? "" : "...";
            },
            showSuccess() {
                this.type = "success";
                store.dispatch("setStateMessage", "Successfully registered");
            },
            showError() {
                this.type = "error";
                store.dispatch("setStateMessage", "Something went wrong");

            },
            is_create() {
                return this.$router.currentRoute.path === "/add-contact";
            }
        },
        computed: {
            display_alert() {
                return store.getters.getMessage.length > 0
            },
            show_img() {
                return store.getters.getContact.length !== 0
            },
            button_name() {
                return this.is_create() ? "Submit" : "Update"
            }
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
    }
</script>

<style scoped>

</style>