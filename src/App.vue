<template>
    <v-card
            color="grey lighten-4"
            flat
            tile
    >
        <v-toolbar>

            <router-link
                    to="/" tag="v-btn" class="contacts">
                <v-toolbar-title>Contacts</v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>

            <router-link to="/favorites" tag="v-btn">
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

            </router-link>

            <router-link to="/add-contact" tag="v-btn">
                <v-btn icon>
                    <v-icon>mdi-account-multiple-plus</v-icon>
                </v-btn>
            </router-link>

            <v-btn icon @click="logout">
                <v-icon>mdi-lock</v-icon>
            </v-btn>
        </v-toolbar>
        <v-app>
            <v-layout row wrap align-center>
                <v-flex>
                    <router-view></router-view>
                </v-flex>
            </v-layout>
        </v-app>
        <v-footer
                color="primary lighten-1 m"
                padless
        >

            <v-col
                    class="primary lighten-2 py-4 text-center white--text"
                    cols="12"
            >
                <h5 class="text-center">
                    {{ new Date().getFullYear() }} — <strong>contacts</strong>
                </h5>
            </v-col>
        </v-footer>
    </v-card>

</template>

<script>
    import {router} from "./route";
    import {store} from "./store/store";

    export default {
        name: 'App',
        components: {},
        data: () => ({
            links: [
                'Home',
                'About Us',
                'Team',
                'Services',
                'Blog',
                'Contact Us',
            ],
        }),
        methods: {
            logout() {
                store.dispatch("resetApiToken");
                router.push("/login");
            }
        }
    };
</script>

<style scoped>
    .contacts {
        cursor: pointer;
    }
</style>