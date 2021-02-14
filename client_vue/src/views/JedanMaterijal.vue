<template>
    <div>
        <h1>{{matstat.naziv}}</h1>
        <div class="p-left">
            <br>
            <h5>Boja: {{matstat.boja}}</h5>
            <h5>Preostala duzina: {{matstat.preostala_duzina}}m</h5>
            <h5>Cena po metru: {{matstat.cena_po_metru}} din</h5>
            <b-button variant="outline-primary" @click="gotoKupovina" v-if="this.$store.getters.isLoggedIn">🛒</b-button>
            <b-button variant="outline-primary" v-else disabled>🛒</b-button>
        </div>
        <br>
        <div v-if="this.$store.getters.isLoggedIn">
            <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Unesite nesto..."
            rows="3"
            max-rows="6"
            ></b-form-textarea>
            <b-button @click="postComment" variant="success">Objavite komentar</b-button>
        </div>
        <div v-else>
            <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Morate da se ulogujete da biste ostavili komentar!"
            rows="3"
            max-rows="6"
            disabled
            ></b-form-textarea>
        </div>
        <br>
        <br>
        <div class="text-left" v-for="comment in comments" :key="comment.komentarID">
            <p> {{ comment.username }} </p>
            <p> {{ comment.tekst }} </p>
            <small> {{ comment.postavljeno_datuma }} </small>
            <br>
            <hr>
            <br>
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
            text: '',
            comments: []
        };
    },
    mounted() {
        this.matdata();
        this.commentsData();
    },
    methods: {
        async matdata() {
            const { data } = await axios.get(`http://localhost:2999/api/materijal/${this.$route.params.id}`);
            this.matstat = data.res;
        },
        async commentsData() {
            const { data } = await axios.get(`http://localhost:2999/api/materijal/komentari/${this.$route.params.id}`);
            this.comments = data.res;
        },
        postComment() {
            const fullComment = {
                tekst: this.text,
                korID: this.$store.getters.getUser.id,
                matID: this.$route.params.id
            };

            axios.post('http://localhost:2999/api/komentar', fullComment)
                .then((res) => { 
                        
                    this.$router.push(`/materijal/${this.$route.params.id}`);

                }).catch((err) => console.log(err));
        },
        gotoKupovina() {
            this.$router.push(`/materijal/kupovina/${this.$route.params.id}`);
        }
    }
}
</script>

<style scoped>

</style>