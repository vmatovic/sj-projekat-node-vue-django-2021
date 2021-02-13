<template>
    <div class="text-left">
        <router-link :to="{name: 'JedanMaterijal', params: {id: materijal.materijalID}}">
            <h5> <strong>{{ materijal.naziv }} {{ materijal.boja }}</strong> {{materijal.cena_po_metru}}</h5>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "MaterijaliLinkovi",
    props: ['materijal']
}
</script>

<style scoped>

</style>