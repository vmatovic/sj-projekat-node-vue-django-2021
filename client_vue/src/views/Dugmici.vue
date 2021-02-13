<template>
    <div>
        <div v-bind:key="dugme.id" v-for="dugme in dugmici">
            <DugmiciLinkovi v-bind:dugme="dugme" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DugmiciLinkovi from '@/components/DugmiciLinkovi';
export default {
    name: "Dugmici",
    components: {
        DugmiciLinkovi
    },
    data() {
        return {
            dugmici: []
        };
    },
    created() {
        axios.get('http://localhost:2999/api/dugmici')
            .then( (res) => {this.dugmici = res.data.res;})
            .catch((e) => {console.log(e)});
    }
}
</script>

<style scoped>

</style>