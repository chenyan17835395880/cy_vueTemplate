<template>
    <el-breadcrumb class="bread" separator="/">
        <!--<el-breadcrumb-item :to="{ path: '/' }"></el-breadcrumb-item>-->
        <el-breadcrumb-item
                v-for="(item)  in levelList"
                :key="item.path"
                v-show="item.meta.label">
            <router-link :to="item.redirect||item.path">{{item.meta.label}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                levelList: []
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },

        methods: {
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name);
                const first = matched[0];
                if (first && first.name !== 'Home') {
                    matched = [{path: '/', meta: {label: '首页'}}].concat(matched)
                }
                this.levelList = matched;
            },
        }
    }
</script>

<style lang="less">
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 46px;
        margin-left: 8px;
        .no-redirect {
            color: #fff !important;
            cursor: text;
        }

    }
    .router-link-active{
        color: #fff !important;
    }
    .router-link-exact-active{
        color: #ddd !important;
    }

</style>
