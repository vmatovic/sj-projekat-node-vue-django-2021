<template>
    <div>
        <h1>{{meblstat.boja}}</h1>
        <div class="p-left">
            <br>
            <h5>Preostala duzina: {{meblstat.preostala_duzina}} m</h5>
            <h5>Cena 10 metara: {{meblstat.cena_deset_metara}} din</h5>
            <b-button variant="outline-primary" @click="gotoKupovina" v-if="this.$store.getters.isLoggedIn">🛒</b-button>
            <b-button variant="outline-primary" v-else disabled>🛒</b-button>
        </div>
        <br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "JedanMebl",
    data() {
        return {
            meblstat: {
            },
            text: ''
        };
    },
    mounted() {
        this.mebldata();
    },
    methods: {
        async mebldata() {
            const { data } = await axios.get(`http://localhost:2999/api/namestaj/${this.$route.params.id}`);
            this.meblstat = data.res;
        },
        gotoKupovina() {
            this.$router.push(`/namestaj/kupovina/${this.$route.params.id}`);
        }
    }
}
</script>

<style scoped>

</style>