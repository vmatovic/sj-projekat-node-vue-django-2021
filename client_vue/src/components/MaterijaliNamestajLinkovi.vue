<template>
    <div class="text-left">
        <h5> <strong>{{ namestaj.boja }}</strong> {{namestaj.cena_deset_metara}}</h5>
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