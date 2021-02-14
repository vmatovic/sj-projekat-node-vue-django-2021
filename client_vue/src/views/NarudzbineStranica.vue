<template>
    <div class="text-left">
        <h4 style="color: gray;">Materijali</h4>
        <div v-if="materijali.length">
            <div v-for="mat in materijali" :key="mat.narudzbinaID">
                <p>Naruceno: {{mat.naziv}} {{mat.boja}} {{mat.kolicina}}m datuma {{mat.datum_narucivanja}} </p>
            </div>
        </div>
        <h6 style="color: #b0b0b0;" v-else>Jos niste narucili materijale.</h6>
        <br>

        <h4 style="color: gray;">Dugmici</h4>
        <div v-if="dugmici.length">
            <div v-for="dug in dugmici" :key="dug.dugmiciID">
                <p>Naruceno: {{dug.boja}} {{dug.kolicina}} komada datuma {{dug.datum_narucivanja}} </p>
            </div>
        </div>
        <h6 style="color: #b0b0b0;" v-else>Jos niste narucili dugmice.</h6>
        <br>

        <h4 style="color: gray;">Meblovi</h4>
        <div v-if="meblovi.length">
            <div v-for="mebl in meblovi" :key="mebl.m_namestajID">
                <p>Naruceno: {{mebl.boja}} {{mebl.kolicina}}m datuma {{mebl.datum_narucivanja}} </p>
            </div>
        </div>
        <h6 style="color: #b0b0b0;" v-else>Jos niste narucili meblove.</h6>
        <br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "NarudzbineStranica",
    data() {
        return {
            korisnik: this.$store.getters.getUser,
            materijali: [],
            dugmici: [],
            meblovi: []
        };
    },
    mounted() {
        this.materijaliData();
        this.dugmiciData();
        this.meblData();
    },
    methods: {
        async materijaliData() {
            const { data } = await axios.get(`http://localhost:2999/api/narudzbine/materijali/${this.korisnik.id}`);
            this.materijali = data.res;
            console.log(data.res);
        },

        async dugmiciData() {
            const { data } = await axios.get(`http://localhost:2999/api/narudzbine/dugmici/${this.korisnik.id}`);
            this.dugmici = data.res;
        },

        async meblData() {
            const { data } = await axios.get(`http://localhost:2999/api//narudzbine/namestaji/${this.korisnik.id}`);
            this.meblovi = data.res;
        }
    }
}
</script>

<style scoped>

</style>