<template>
    <div class="text-left">
        <h2> {{ korisnik.username }} </h2>
        <h5> {{ korisnik.email }} </h5>
        <h6> Registrovan: {{ korisnik.registered }} </h6>
        <h6> Poslednji login: {{ korisnik.last_login }} </h6>
        <br>
        <br>
        <h2>Komentari:</h2>
        <div v-for="kom in licni_komentari" :key="kom.komentarID">
            <p> {{ kom.naziv }} {{ kom.boja }} </p>
            <p> {{ kom.tekst }} </p>
            <small> {{ kom.postavljeno_datuma }} </small>
            <b-button @click="brisiKomentar(kom.komentarID)" variant="danger">Obrisi</b-button>
            <br>
            <hr>
            <br>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ProfilnaStranica",
    data() {
        return {
            korisnik: this.$store.getters.getUser,
            licni_komentari: []
        };
    },
    mounted() {
        this.comData();
    },
    methods: {
        async comData() {
            const { data } = await axios.get(`http://localhost:2999/api/profil/komentari/${this.korisnik.id}`);
            this.licni_komentari = data.res;
        },

        brisiKomentar(_id) {
            console.log(_id);
            axios.delete(`http://localhost:2999/api/komentar/`,
            {
                data: {
                    id: _id,
                },
                    headers: {

                }
            });
        }
    }
}
</script>

<style scoped>

</style>