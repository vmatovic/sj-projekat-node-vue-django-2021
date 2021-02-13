<template>
    <div class="text-left">
        <h5> <strong>{{ dugme.boja }}</strong> Cena 10 dugmica: {{dugme.cena_deset_dugmica}} din</h5>
    </div>
</template>

<script>
export default {
    name: "DugmiciLinkovi",
    props: ['dugme']
}
</script>

<style scoped>

</style>