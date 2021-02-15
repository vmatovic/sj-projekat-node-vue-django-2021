<template>
    <div>
        <br>
        <h4>Preostalo materijala {{ naziv }} {{ boja }}: {{ preostalo }}m</h4>
        <br>
        <h3>Koliko metara?</h3>
        <input type="text" placeholder="metara" v-model="metri" />
        <pre class="mt-3 mb-0">Placate {{ cena * metri }} din</pre>
        <br>
        <b-button @click="plati" variant="success">Plati</b-button>
        <p style="color:green;"> {{ poruka }} </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "KupovinaMaterijala",
    data() {
        return {
            preostalo: 0,
            naziv: '',
            boja: '',
            cena: 0,
            metri: '',
            poruka: ''
        };
    },
    async created() {
        const { data } = await axios.get(`http://localhost:2999/api/materijal/${this.$route.params.id}`);
        this.preostalo = data.res.preostala_duzina;
        this.naziv = data.res.naziv;
        this.boja = data.res.boja;
        this.cena = data.res.cena_po_metru;
    },
    methods: {
        plati() {
            const myObj = {
                amt: this.metri,
                korID: this.$store.getters.getUser.id
            };
            if (this.metri < 0) {
                this.poruka = 'Negativni metri nisu dozvoljeni';
            }
            else {
                axios.post(`http://localhost:2999/api/materijal/placanje/${this.$route.params.id}`, myObj)
                    .then(res => {this.poruka = res.data.msg});
            }
        }
    }
}
</script>

<style scoped>

</style>