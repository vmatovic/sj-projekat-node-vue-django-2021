<template>
    <div>
        <br>
        <h4>Preostao {{ boja }} mebl: {{ preostalo }}m</h4>
        <br>
        <h3>Koliko metara?</h3>
        <input type="text" placeholder="metri" v-model="metri" />
        <pre class="mt-3 mb-0">Placate {{ cena * metri }} din</pre>
        <br>
        <b-button @click="plati" variant="success">Plati</b-button>
        <p style="color:green;"> {{ poruka }} </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "KupovinaMebla",
    data() {
        return {
            preostalo: 0,
            boja: '',
            metri: '',
            poruka: '',
            cena: 0
        };
    },
    async created() {
        const { data } = await axios.get(`http://localhost:2999/api/namestaj/${this.$route.params.id}`);
        this.preostalo = data.res.preostala_duzina;
        this.boja = data.res.boja;
        this.cena = data.res.cena_deset_metara / 10;
    },
    methods: {
        plati() {
            const myObj = {
                amt: this.metri,
                korID: this.$store.getters.getUser.id
            };
            if (this.metri < 10) {
                this.poruka = 'Morate da unesete vise od 10 metara.';
            }
            else {
                axios.post(`http://localhost:2999/api/namestaj/placanje/${this.$route.params.id}`, myObj)
                    .then(res => {this.poruka = res.data.msg});
            }
        }
    }
}
</script>

<style scoped>

</style>