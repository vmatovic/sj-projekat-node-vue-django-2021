<template>
    <div>
        <h1>Sign up</h1>
        <input type="text" placeholder="Korisnicko ime" v-model="username" />
        <input type="text" placeholder="E-mail" v-model="email" />
        <input type="password" placeholder="Sifra" v-model="password" />
        <input type="password" placeholder="Potvrdjivanje..." v-model="password_confirmation" />
        <input type="button" @click="signUp" value="Sign up" />
        <p v-if="msg">{{ msg }}</p>
    </div>    
</template>

<script>
import AuthService from '@/services/AuthService.js'

export default {
    name: "SignUp",
    data() {
        return {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            msg: ''
        };
    },
    methods: {
        async signUp() {
            try {
                const credentials = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                };
                const response = await AuthService.signUp(credentials);
                this.msg = response.msg;
            } catch (error) {
                this.msg = error.response.data.msg;
            }
        }
    }
}
</script>

<style scoped>

</style>