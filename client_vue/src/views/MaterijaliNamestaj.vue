<template>
    <div>
        <div v-bind:key="namestaj.id" v-for="namestaj in namestaji">
            <MaterijaliNamestajLinkovi v-bind:namestaj="namestaj" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MaterijaliNamestajLinkovi from '@/components/MaterijaliNamestajLinkovi';
export default {
    name: "MaterijaliNamestaj",
    components: {
        MaterijaliNamestajLinkovi
    },
    data() {
        return {
            namestaji: []
        };
    },
    created() {
        axios.get('http://localhost:2999/api/namestaj')
            .then( (res) => {this.namestaji = res.data.res;})
            .catch((e) => {console.log(e)});
    }
}
</script>

<style scoped>

</style>