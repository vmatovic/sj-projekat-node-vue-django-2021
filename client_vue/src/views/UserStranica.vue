<template>
    <div>
        <ul class="list-group">
            <div v-for="kor in korisnici" :key="kor.id">
                <li class="list-group-item"> Username: {{ kor.username }} | Email: {{ kor.email }} | Registrovan: {{ kor.registered }} </li>
            </div>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "UserStranica",
    data() {
        return {
            korisnici: []
        };
    },
    async created() {
        if (!this.$store.getters.isAdmin) {
            this.$router.push('/login');
        }
        const { data } = await axios.get('http://localhost:2999/api/korisnici/');
        this.korisnici = data.res;
    }
}
</script>

<style scoped>

</style>