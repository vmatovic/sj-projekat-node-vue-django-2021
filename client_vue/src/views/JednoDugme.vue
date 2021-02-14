<template>
    <div>
        <h1>{{dugmestat.boja}}</h1>
        <div class="p-left">
            <br>
            <h5>Preostala kolicina dugmica: {{dugmestat.kolicina}} dugmica</h5>
            <h5>Cena 10 dugmica: {{dugmestat.cena_deset_dugmica}} din</h5>
            <b-button variant="outline-primary" @click="gotoKupovina" v-if="this.$store.getters.isLoggedIn">🛒</b-button>
            <b-button variant="outline-primary" v-else disabled>🛒</b-button>
        </div>
        <br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "JednoDugme",
    data() {
        return {
            dugmestat: {
            },
            text: ''
        };
    },
    mounted() {
        this.dugmedata();
    },
    methods: {
        async dugmedata() {
            const { data } = await axios.get(`http://localhost:2999/api/dugme/${this.$route.params.id}`);
            this.dugmestat = data.res;
        },
        gotoKupovina() {
            this.$router.push(`/dugme/kupovina/${this.$route.params.id}`);
        }
    }
}
</script>

<style scoped>

</style>