<template>
    <div>
        <br>
        <br>
        <h3>Koliko metara?</h3>
        <input type="text" placeholder="metara" v-model="metri" />
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
            axios.post(`http://localhost:2999/api/materijal/placanje/${this.$route.params.id}`, myObj)
                 .then(res => {this.poruka = res.data.msg});
        }
    }
}
</script>

<style scoped>

</style>