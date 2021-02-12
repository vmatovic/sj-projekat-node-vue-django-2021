<template>
    <div>
        <b-table v-if="messages.length" sticky-header="800px" :items="messages" head-variant="light"></b-table>
        <h1 v-else>No messages.</h1>
    </div>
</template>

<script>
import router from '@/router';
import { mapState, mapActions } from 'vuex';

export default {
    name: "MessageList",
    computed: {
        ...mapState(['messages'])
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['delete_message']),

        editMessage: function() {
            
        }
    }
}
</script>

<style scoped>

</style>