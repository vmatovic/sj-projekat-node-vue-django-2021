<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Cloth Shop Delta</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <b-dropdown id="dropdown-1" text="Izaberite kategoriju" variant="primary" class="m-md-2">
                        <b-dropdown-item href="/materijali">Materijali</b-dropdown-item>
                        <b-dropdown-item href="/dugmici">Dugmici</b-dropdown-item>
                        <b-dropdown-item href="/namestaj">Materijali za namestaj</b-dropdown-item>
                    </b-dropdown>
                </li>
            </ul>
            <form class="d-flex">
                <input class="form-control me-2 w-100" type="search" placeholder="Pretraga..." aria-label="Search">
                <button class="btn btn-outline-success" type="submit">🔍</button>
            </form>
            <div v-if="!this.$store.getters.isLoggedIn">
                <a class="nav-link active" aria-current="page" href="/login">Prijavljivanje</a>
            </div>
            <div v-else>
                <b-dropdown id="dropdown-header" text="Nalog" class="m-2">
                    <b-dropdown-header id="dropdown-header-label">
                    {{ this.$store.getters.getUser.username }}
                    </b-dropdown-header>
                    <b-dropdown-item-button aria-describedby="dropdown-header-label">
                    Profil
                    </b-dropdown-item-button>
                    <b-dropdown-item-button @click="logout" aria-describedby="dropdown-header-label">
                    Odjava
                    </b-dropdown-item-button>
                </b-dropdown>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "Header",
    computed: {
        ...mapState(['messages'])
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>

</style>