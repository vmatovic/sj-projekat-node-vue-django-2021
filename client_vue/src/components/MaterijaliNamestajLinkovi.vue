<template>
    <div class="text-left">
        <router-link :to="{name: 'JedanMebl', params: {id: namestaj.m_namestajID}}">
            <h5> <strong>{{ namestaj.boja }}</strong> Cena 10 metara: {{namestaj.cena_deset_metara}}</h5>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "MaterijaliNamestajLinkovi",
    props: ['namestaj']
}
</script>

<style scoped>

</style>