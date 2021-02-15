<template>
    <div id="app">
        <List />
        <h1>Cao {{ username }}</h1>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import List from '@/components/List';
export default {
    name: "Home",
    data() {
        return {
            username: ''
        };
    },
    async created() {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
        }
        this.username = this.$store.getters.getUser.username;
    },
    methods: {
    },
    components: {
        List
    }
}
</script>

<style scoped>

</style>