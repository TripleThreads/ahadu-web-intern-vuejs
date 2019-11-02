<template class="mx-auto">
    <v-card class="mx-auto" max-width="344" outlined>
        <v-alert dense text dismissible :type="type" v-show="display_alert" v-text="this.$store.getters.getMessage">
            Successfully registered
        </v-alert>

        <v-toolbar color="blue darken-2" dark>
            <v-toolbar-title>Add new contact</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>

        <v-form class="my-4 mx-4" v-model="valid" ref="form">
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
                   @change="handleFileUpload" :rules="rules.file"/>

            <div class="my-2 mx-auto align-center align-content-center">
                <v-btn :disabled="!valid" color="success" class="d-block mx-auto" @click="submit"> Register</v-btn>
            </div>
        </v-form>

    </v-card>
</template>

<script>
    import ajax from "../ajax";
    import {store} from "../store/store";
    import {Contact, Rules} from "../models/contact";
    import {handleError} from "../error-handler";

    export default {
        name: "AddContact",
        data() {
            return {
                button_text: "upload Image",
                type: "success",
                menu: false,
                modal: false,
                contact: Contact,
                rules: Rules,
                valid: false
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
                // submits our data to server and if its successful resets the form also show a success message
                ajax.post(`users/${store.getters.getUserId}/contacts`,
                    formData,
                ).then(function () {
                    self.showSuccess();
                    // clear contact object if we are navigating away from registration
                    for (let member in Contact) delete Contact[member];
                    self.$refs.form.resetValidation();
                }, error => {
                    self.showError();
                    handleError(error);
                });

            },

            handleFileUpload() {
                // file upload handler
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
            // the following method only shows an alert if there is message to show
            display_alert() {
                return store.getters.getMessage.length > 0
            },
        },
        watch: {
            menu(val) {
                // for a date picker
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
    }
</script>

<style scoped>

</style>