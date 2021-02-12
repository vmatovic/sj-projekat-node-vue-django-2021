<template>
    <div id="app">
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
import MessageList from '@/components/MessageList'
export default {
    name: "Home",
    components: {
        MessageList
    }
}
</script>

<style scoped>

</style>