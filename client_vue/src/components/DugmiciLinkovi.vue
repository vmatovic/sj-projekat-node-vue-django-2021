<template>
    <div class="text-left">
        <router-link :to="{name: 'JednoDugme', params: {id: dugme.dugmiciID}}">
            <h5> <strong>{{ dugme.boja }}</strong> Cena 10 dugmica: {{dugme.cena_deset_dugmica}} din</h5>
        </router-link>
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