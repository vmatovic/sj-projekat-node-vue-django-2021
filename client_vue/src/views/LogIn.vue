<template>
    <div>
        <h1>Log in</h1>
        <input type="text" placeholder="Korisnicko ime" v-model="username" />
        <input type="password" placeholder="Sifra" v-model="password" />
        <input type="button" @click="login" value="Sign up" />
        <p v-if="msg">{{ msg }}</p>
    </div>    
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
    name: "LogIn",
    data() {
        return {
            username: '',
            password: '',
            msg: ''
        };
    },
    methods: {
        async login() {
            try {
                const credentials = {
                    username: this.username,
                    password: this.password
                };
                const response = await AuthService.login(credentials);
                this.msg = response.msg;

                const token = response.token;
                const user = response.user;

                this.$store.dispatch('login', { token, user });
                this.$router.push('/');
            } catch (error) {
                this.msg = error.response.data.msg;
            }
        }
    }
}
</script>

<style scoped>

</style>