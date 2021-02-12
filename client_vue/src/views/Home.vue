<template>
    <div id="app">
        <Header />
        <b-container>
            <b-row>
                <b-col cm="6">
                    <MessageList />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Header from '@/components/Header'
import MessageList from '@/components/MessageList'
export default {
    name: "Home",
    components: {
        Header,
        MessageList
    }
}
</script>

<style scoped>

</style>