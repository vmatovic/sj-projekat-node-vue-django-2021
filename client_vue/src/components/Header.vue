<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <b-dropdown id="dropdown-1" text="Izaberite kategoriju" variant="primary" class="m-md-2">
                        <b-dropdown-item>Materijali</b-dropdown-item>
                        <b-dropdown-item>Dugmici</b-dropdown-item>
                        <b-dropdown-item>Materijali za namestaj</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item active>Active action</b-dropdown-item>
                        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                    </b-dropdown>
                </li>
            </ul>
            <form class="d-flex">
                <input class="form-control me-2 w-100" type="search" placeholder="Pretraga..." aria-label="Search">
                <button class="btn btn-outline-success" type="submit">🔍</button>
            </form>
            <a class="nav-link active" aria-current="page" href="#">Registracija</a>
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
    }
}
</script>

<style scoped>

</style>