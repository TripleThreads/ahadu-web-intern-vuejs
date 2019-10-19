<template>
    <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
    >
        <v-img
                height="250"
                :src="'http://localhost:3000/uploads/' + get_contact.photo"
        ></v-img>

        <v-card-title v-text="get_contact.name"></v-card-title>

        <v-card-text>
            <v-row
                    align="center"
                    class="mx-0"
            >
                <div v-text="'phone number: ' + get_contact.phone_number"></div>
                <v-spacer></v-spacer>
                <v-btn icon class="float-right mr-4">
                    <v-icon :color="get_contact.is_favorite ? 'red' : 'grey'">mdi-heart</v-icon>
                </v-btn>
            </v-row>

            <div class="my-4 subtitle-1 black--text"
                 v-text="'Location: ' + get_contact.sub_city + ', ' + get_contact.city">
            </div>

            <div v-text="'Date of birth: ' + get_contact.date_of_birth.substring(0, 10)"></div>
            <div v-text="'House number: ' + get_contact.house_number.substring(0, 10)"></div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {store} from '../store/store';

    export default {
        data: () => ({
            loading: false,
            selection: 1,
        }),

        methods: {
        },
        computed: {
            get_contact() {
                return store.getters.getContact;
            }
        }
    }
</script>
<style scoped>

</style>