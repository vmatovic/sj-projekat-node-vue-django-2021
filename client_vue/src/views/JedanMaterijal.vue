<template>
    <div>
        <h1>{{matstat.naziv}}</h1>
        <div class="p-left">
            <br>
            <h5>Boja: {{matstat.boja}}</h5>
            <h5>Preostala duzina: {{matstat.preostala_duzina}}m</h5>
            <h5>Cena po metru: {{matstat.cena_po_metru}} din</h5>
        </div>
        <br>
        <div>
            <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Unesite nesto..."
            rows="3"
            max-rows="6"
            ></b-form-textarea>

            <pre class="mt-3 mb-0">{{ text }}</pre>
            <b-button @click="postComment" variant="success">Objavite komentar</b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "JedanMaterijal",
    data() {
        return {
            matstat: {
            },
            text: ''
        };
    },
    mounted() {
        this.matdata();
    },
    methods: {
        async matdata() {
            const { data } = await axios.get(`http://localhost:2999/api/materijal/${this.$route.params.id}`);
            this.matstat = data.res;
        },
        postComment() {
            const fullComment = {
                tekst: this.text,
                korID: this.$store.getters.getUser.id,
                matID: this.$route.params.id
            };

            axios.post('http://localhost:2999/api/komentar', fullComment)
                .then((res) => { this.$router.push(`/materijal/${this.$route.params.id}`); })
                .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped>

</style>