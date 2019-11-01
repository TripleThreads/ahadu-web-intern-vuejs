<template class="mx-auto">

    <v-card class="mx-auto" max-width="344" outlined>

        <v-alert dense text type="error" v-show="show" v-text="this.$store.getters.getMessage">
        </v-alert>

        <v-toolbar color="blue darken-2" dark>
            <v-toolbar-title>Login to your contacts</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>
        <v-form class="mx-4 my-4" v-model="valid">
            <v-text-field
                    :rules="rules.required"
                    v-model="user.username"
                    label="Email"
                    required
            ></v-text-field>
            <v-text-field
                    :rules="rules.required"
                    :append-icon="!show1 ? 'mdi-eye-off' : 'mdi-eye'"
                    v-model="user.password"
                    label="Password"
                    :type="show1 ? 'text' : 'password'"
                    required
                    @click:append="show1 = !show1"
            ></v-text-field>

            <div class="my-2 mx-auto align-center align-content-center">
                <v-btn :disabled="!valid" color="success" class="d-block mx-auto" @click="submit"> Login</v-btn>
                <router-link to="/register" class="d-block mx-auto text-center my-2">Register</router-link>
            </div>
        </v-form>

    </v-card>
</template>

<script>
    import {router} from '../route';
    import {store} from "../store/store"
    import ajax from "../ajax";

    import {handleError} from "../auth";

    export default {
        data() {
            return {
                valid: false,
                show1: false,
                errorMsg: false,
                user: {
                    username: "string",
                    password: 'string',
                },
                rules: {
                    required: [val => (val || '').length > 0 || 'This field is required'],
                },
            }
        },
        methods: {
            submit() {
                ajax.post("users/login", this.user)
                    .then(response => {
                        store.dispatch("setApiToken", response.data);
                        store.dispatch("resetMessage");
                        router.push("/"); // route to contacts list if the authentication is successful
                    }, error => {
                        store.dispatch("setStateMessage", "The email and password you entered don't match");
                        handleError(error);
                    });
            },
        },
        computed: {
            show() { // show an alert message if only there is one
                return store.getters.getMessage !== "";
            }
        }
    }
</script>

<style scoped>

</style>