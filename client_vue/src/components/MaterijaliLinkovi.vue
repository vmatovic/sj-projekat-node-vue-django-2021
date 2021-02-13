<template>
    <div class="text-left">
        <h5> <strong>{{ materijal.naziv }} {{ materijal.boja }}</strong> {{materijal.cena_po_metru}}</h5>
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