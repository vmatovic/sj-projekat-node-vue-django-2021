<template>
    <div id="app">
        <List />
        <h1>Cao {{ username }}</h1>
        <p>{{ secretMessage }}</p>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import List from '@/components/List';
export default {
    name: "Home",
    data() {
        return {
            secretMessage: '',
            username: ''
        };
    },
    async created() {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
        }
        this.username = this.$store.getters.getUsername;
        this.secretMessage = await AuthService.getSecret();
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