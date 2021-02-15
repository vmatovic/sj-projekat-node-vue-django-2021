<template>
    <div>
        <br>
        <h4>Preostalo dugmica boje {{ boja }} : {{ preostalo }}</h4>
        <br>
        <h3>Koliko dugmica?</h3>
        <input type="text" placeholder="kolicina" v-model="kolicina" />
        <pre class="mt-3 mb-0">Placate {{ cena * kolicina }} din</pre>
        <br>
        <b-button @click="plati" variant="success">Plati</b-button>
        <p style="color:green;"> {{ poruka }} </p>
    </div>
</template>

<script>
import axios from 'axios';
import Joi from 'joi';

export default {
    name: "KupovinaDugmeta",
    data() {
        return {
            preostalo: 0,
            boja: '',
            kolicina: '',
            cena: 0,
            poruka: ''
        };
    },
    async created() {
        const { data } = await axios.get(`http://localhost:2999/api/dugme/${this.$route.params.id}`);
        this.preostalo = data.res.kolicina;
        this.boja = data.res.boja;
        this.cena = data.res.cena_deset_dugmica;
    },
    methods: {
        plati() {
            const schema = Joi.object().keys({
                amt: Joi.number().integer().min(10).max(this.preostalo),
                korID: Joi.string()
            });

            const myObj = {
                amt: this.kolicina,
                korID: this.$store.getters.getUser.id
            };

            const result = schema.validate(myObj);
            if (result.error != null) {
                this.poruka = 'Unos nije dobar';
            }
            else {
                axios.post(`http://localhost:2999/api/dugme/placanje/${this.$route.params.id}`, myObj)
                    .then(res => {this.poruka = res.data.msg});
            }
        }
    }
}
</script>

<style scoped>

</style>