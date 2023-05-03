<script setup lang="ts"></script>

<template>
    <section>
        <meta name="referrer" content="no-referrer" />
        <component :is="layout">
            <router-view />
        </component>
    </section>
</template>

<script>
import DefaultLayout from './layout/default.vue';
export default {
    components: {
        DefaultLayout,
    },
    computed: {
        layout() {
            // 获取当前路由的meta.layout属性
            const layout = this.$route.meta.layout;
            // 如果没有指定layout，默认使用default layout
            return layout ? `layout-${layout}` : 'DefaultLayout';
        },
    },
};
</script>

<style>
html {
    overflow: hidden;
}
</style>
