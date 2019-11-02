<template class="mx-auto">

    <v-card class="mx-auto" max-width="344" outlined>
        <v-alert dense text type="error" v-show="show" v-text="this.$store.getters.getMessage">
        </v-alert>

        <v-toolbar
                color="blue darken-2"
                dark
        >
            <v-toolbar-title>Create an account</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>
        <v-form class="mx-4 my-4" v-model="valid" ref="form">
            <v-text-field
                    v-model="user.username"
                    :rules="rules.required"
                    label="Username"
                    required
            ></v-text-field>
            <v-text-field
                    :append-icon="!show1 ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="rules.required"
                    v-model="user.password"
                    label="Password"
                    :type="show1 ? 'text' : 'password'"
                    required
                    ref="password"
                    @click:append="show1 = !show1"
            ></v-text-field>
            <v-text-field
                    :append-icon="!show1 ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="rules.match"
                    v-model="user.confirm_password"
                    label="Confirm password"
                    :type="show1 ? 'text' : 'password'"
                    required
                    @click:append="show1 = !show1"
            ></v-text-field>

            <div class="my-2 mx-auto align-center align-content-center">
                <v-btn :disabled="!valid" color="success" class="d-block mx-auto" @click="submit"> Register
                </v-btn>
                <router-link to="/login" class="mx-auto d-block text-center my-2 v-card--link">Login</router-link>
            </div>
        </v-form>

    </v-card>
</template>

<script>
    import {router} from '../route';
    import ajax from "../ajax";
    import {handleError} from "../error-handler";
    import { store } from "../store/store";

    export default {
        data() {
            return {
                valid: false,
                show1: false,
                user: {
                    username: "segni",
                    password: 'Password',
                    confirm_password: ''
                },
                rules: {
                    required: [val => (val || '').length > 0 || 'This field is required'],
                    match: [v => (v === this.user.password && v.length > 0) || "Password doesn't match"]
                }
            }
        },
        methods: {
            submit() {
                ajax.post("users", this.user).then(() => {
                    router.push("/login");
                }, error => {
                    handleError(error);
                });
            }
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