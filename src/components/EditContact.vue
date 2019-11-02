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
                height="200px"></v-img>

        <v-form class="my-4 mx-4" v-model="valid">
            <v-text-field
                    v-model="contact.name"
                    :rules="rules.name"
                    label="Name"
                    required></v-text-field>

            <v-text-field
                    v-model="contact.phone_number"
                    label="Phone number"
                    :counter="10"
                    :rules="rules.phone_number"
                    required></v-text-field>
            <v-row>
                <v-col>
                    <v-text-field
                            v-model="contact.city"
                            label="City"
                            :rules="rules.city"
                            required></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                            v-model="contact.sub_city"
                            label="Sub city"
                            :rules="rules.sub_city"
                            required></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <v-text-field
                            v-model="contact.house_number"
                            :rules="rules.house_number"
                            label="House no."
                            required></v-text-field>
                </v-col>

                <v-col cols="11" sm="8">
                    <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="contact.date_of_birth"
                            persistent
                            width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="contact.date_of_birth"
                                    label="Birthday date"
                                    :rules="rules.date_of_birth"
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
                <v-btn :disabled="!valid" color="success" class="d-block mx-auto" @click="submit"> Update
                </v-btn>
            </div>
        </v-form>

    </v-card>
</template>

<script>
    import ajax from "../ajax";

    import {router} from "../route";
    import {store} from "../store/store";
    import {Rules} from "../models/contact";

    import {handleError} from "../error-handler";

    export default {
        name: "EditContact",
        data() {
            return {
                valid: false,
                contact: store.getters.getContact,
                rules: Rules,
                button_text: "Upload Image",
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

                formData.append('is_favorite', store.getters.getContact.is_favorite);
                ajax.patch(`users/${store.getters.getUserId}/contacts`,
                    formData
                ).then(() => {
                    router.push("/");
                }, error => {
                    self.showError();
                    handleError(error);
                });

            },

            handleFileUpload() {
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

            }
        },
        computed: {
            display_alert() {
                return store.getters.getMessage.length > 0
            },
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        }
    }
</script>

<style scoped>

</style>