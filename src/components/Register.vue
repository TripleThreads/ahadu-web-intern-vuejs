<template class="mx-auto">
    <v-card
            class="mx-auto"
            max-width="344"
            outlined
    >
        <v-toolbar
                color="blue darken-2"
                dark
        >
            <v-toolbar-title>Create an account</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>
        <form class="mx-4 my-4">
            <v-text-field
                    v-model="user.username"
                    label="Username"
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
            <v-text-field
                    :append-icon="!show1 ? 'mdi-eye-off' : 'mdi-eye'"
                    v-model="user.password"
                    label="Confirm password"
                    :type="show1 ? 'text' : 'password'"
                    required
                    @click:append="show1 = !show1"
            ></v-text-field>

            <div class="my-2 mx-auto align-center align-content-center">
                <router-link to="/login" class="mx-auto d-block text-center my-2 v-card--link">Login</router-link>
                <v-btn color="success" class="d-block mx-auto" @click="submit()" dark> Register </v-btn>
            </div>
        </form>

    </v-card>
</template>


<script>
    import { router } from '../route.js';

    export default {
        data () {
            return {
                show1: false,
                user : {
                    username: "segni",
                    password: 'Password',
                },
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                }
            }
        },
        methods: {
            submit() {
                this.$http.post("http://localhost:3000/users", this.user).then(() => {
                    router.push("/login");
                }, error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>