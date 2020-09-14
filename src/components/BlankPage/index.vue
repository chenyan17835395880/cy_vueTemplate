<template>
    <div class="blank-page"></div>
</template>

<script>
    export default {
        name: "BlankPage",
        data(){
            return {

            }
        },
        methods: {

        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$router.replace(from.path)
            })
        }
    }
</script>

<style scoped>
    .blank-page{
        display: flex;
        flex: 1;
        background: #f1f1f1;
    }
</style>
