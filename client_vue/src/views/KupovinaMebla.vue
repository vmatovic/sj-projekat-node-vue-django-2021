<template>
    <div>
        <br>
        <br>
        <h3>Koliko metara?</h3>
        <input type="text" placeholder="metri" v-model="metri" />
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
            metri: '',
            poruka: ''
        };
    },
    methods: {
        plati() {
            const myObj = {
                amt: this.metri,
                korID: this.$store.getters.getUser.id
            };
            console.log(myObj.amt);
            axios.post(`http://localhost:2999/api/namestaj/placanje/${this.$route.params.id}`, myObj)
                 .then(res => {this.poruka = res.data.msg});
        }
    }
}
</script>

<style scoped>

</style>