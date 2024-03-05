<script setup lang="ts">
    import TabMenu from 'primevue/tabmenu';
    import { ref } from "vue";
    import router from '../core/router.ts';

    const items = ref([
        {
            label: 'Colors',
            command: () => {
                router.push({ name: 'configColors' }).then();
            }
        },
        {
            label: 'Tint & Shade',
            command: () => {
                router.push({ name: 'configTintshade' }).then();
            }
        },
        {
            label: 'Output',
            command: () => {
                router.push({ name: 'configOutput' }).then();
            }
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
