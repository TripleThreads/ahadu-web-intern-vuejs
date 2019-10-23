<template class="mx-auto">

    <v-card class="mx-auto" max-width="344" outlined>

        <v-alert dense outlined type="error" v-show="show" v-text="this.$store.getters.getMessage">
        </v-alert>

        <v-toolbar color="blue darken-2" dark>
            <v-toolbar-title>Login to your contacts</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>
        <form class="mx-4 my-4">
            <v-text-field
                    v-model="user.username"
                    label="Email"
                    required
            ></v-text-field>
            <v-text-field
                    :append-icon="!show1 ? 'mdi-eye-off' : 'mdi-eye'"
                    v-model="user.password"
                    label="Password"
                    :type="show1 ? 'text' : 'password'"
                    required
                    @click:append="show1 = !show1"
            ></v-text-field>

            <div class="my-2 mx-auto align-center align-content-center">
                <v-btn color="success" class="d-block mx-auto" @click="submit" dark> Login</v-btn>
                <router-link to="/register" class="d-block mx-auto text-center my-2">Register</router-link>
            </div>
        </form>

    </v-card>
</template>

<script>
    import {router} from '../route';
    import {store} from "../store/store"
    import ajax from "../ajax";
    import {isAuthorizationError} from "../auth";

    export default {
        data() {
            return {
                show1: false,
                errorMsg: false,
                user: {
                    username: "string",
                    password: 'string',
                },
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                },
            }
        },
        methods: {
            submit() {
                ajax.post("users/login", this.user)
                    .then(response => {
                        store.dispatch("setApiToken", response.data);
                        store.dispatch("resetMessage");
                        router.push("/");
                    }, error => {
                        store.dispatch("setStateMessage", "The email and password you entered don't match");
                        isAuthorizationError(error);
                    });
            },
        },
        computed: {
            show() {
                return store.getters.getMessage !== "";
            }
        }
    }
</script>

<style scoped>

</style>