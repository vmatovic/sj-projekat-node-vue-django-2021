<template>
    <div>
        <h1>Log in</h1>
        <input type="text" placeholder="Korisnicko ime" v-model="username" />
        <input type="password" placeholder="Sifra" v-model="password" />
        <input type="button" @click="login" value="Sign up" />
        <br>
        <br>
        <a href="/sign-up">Ako niste registrovani do sada, kliknite ovde.</a>
        <br>
        <p v-if="msg">{{ msg }}</p>
    </div>    
</template>

<script>
import AuthService from '@/services/AuthService.js';
import Joi from 'joi';

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
            const schema = Joi.object().keys({
                username: Joi.string().alphanum().min(3).max(30),
                password: Joi.string().min(3).max(50),
            });
            try {

                const credentials = {
                    username: this.username,
                    password: this.password
                };

                const result = schema.validate(credentials);

                if (result.error != null) {
                    this.msg = 'Unesite druge parametre.'
                }
                else {
                    const response = await AuthService.login(credentials);
                    this.msg = response.msg;

                    const token = response.token;
                    const user = response.user;

                    this.$store.dispatch('login', { token, user });
                    this.$router.push('/');
                }
            } catch (error) {
                this.msg = error.response.data.msg;
            }
        }
    }
}
</script>

<style scoped>

</style>