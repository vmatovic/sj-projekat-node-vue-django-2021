<template>
    <div>
        <br>
        <br>
        <h3>Koliko dugmica?</h3>
        <input type="text" placeholder="kolicina" v-model="kolicina" />
        <b-button @click="plati" variant="success">Plati</b-button>
        <p style="color:green;"> {{ poruka }} </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "KupovinaDugmeta",
    data() {
        return {
            kolicina: '',
            poruka: ''
        };
    },
    methods: {
        plati() {
            const myObj = {
                amt: this.kolicina,
                korID: this.$store.getters.getUser.id
            };
            console.log(myObj.amt);
            axios.post(`http://localhost:2999/api/dugme/placanje/${this.$route.params.id}`, myObj)
                 .then(res => {this.poruka = res.data.msg});
        }
    }
}
</script>

<style scoped>

</style>