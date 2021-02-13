<template>
    <div>
        <div v-bind:key="materijal.id" v-for="materijal in materijali">
            <MaterijaliLinkovi v-bind:materijal="materijal" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MaterijaliLinkovi from '@/components/MaterijaliLinkovi';
export default {
    name: "Materijali",
    components: {
        MaterijaliLinkovi
    },
    data() {
        return {
            materijali: []
        };
    },
    created() {
        axios.get('http://localhost:2999/api/materijali')
            .then( (res) => {this.materijali = res.data.res;})
            .catch((e) => {console.log(e)});
    }
}
</script>

<style scoped>

</style>