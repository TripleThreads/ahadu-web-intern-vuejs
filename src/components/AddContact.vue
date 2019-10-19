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

    export default {
        name: "AddContact",
        data() {
            return {
                contact: {
                    phone_number: store.getters.getContact.phone_number,
                    name: store.getters.getContact.name,
                    file: ''
                },
                button_text: "upload Image",
                type: "success"
            }
        },
        methods: {

            submit() {

                let formData = new FormData();

                formData.append('photo', this.contact.file);
                formData.append('name', this.contact.name);
                formData.append('phone_number', this.contact.phone_number);
                let self = this;

                if (this.$router.currentRoute.path === "/add-contact") {
                    ajax.post('contacts',
                        formData,
                    ).then(function () {
                        self.showSuccess();
                    }, () => {
                        self.showError();
                    });
                } else {
                    formData.append('is_favorite', store.getters.getContact.is_favorite);
                    ajax.patch('contacts/' + store.getters.getContact.id,
                        formData
                    ).then(() => {
                        router.push("/");
                    }, () => {
                        self.showError();
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
                return this.$router.currentRoute.path === "/add-contact" ? "Submit" : "Update"
            }
        }
    }
</script>

<style scoped>

</style>