<script setup lang="ts">
    import TabMenu from 'primevue/tabmenu';
    import { ref } from "vue";

    const items = ref([
        {
            label: 'Colors',
            to: '/config/'
        },
        {
            label: 'Tint & Shade',
            to: '/config/tintshade'
        },
        {
            label: 'Output',
            to: '/config/output'
        }
    ]);
</script>

<template>
    <TabMenu :model="items" />
    <div class="config-wrapper">
        <router-view />
    </div>
</template>

<style scoped lang="scss">
.config-wrapper {
    width: 100%;
    height: calc(100% - 44px);
    overflow: auto;
}
</style>
