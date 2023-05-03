<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-container>
        <el-header>
            <navfrom />
        </el-header>
        <router-view style="height: 90vh; overflow-x: hidden"></router-view>
    </el-container>
</template>

<script lang="ts">
import navfrom from '../components/navfrom.vue';
export default {
    components: { navfrom },
};
</script>
