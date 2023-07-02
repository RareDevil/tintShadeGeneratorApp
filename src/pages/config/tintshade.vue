<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import { ref } from "vue/dist/vue";

// const colorType = ref([
//     { label: 'Hexadecimal RGB', value: 'HEX' },
//     { label: 'Hexadecimal RGB with Alpha', value: 'HEXA' },
//     { label: 'RGB', value: 'RGB' },
//     { label: 'RGB with Alpha', value: 'RGBA' },
//     { label: 'HSL', value: 'HSL' },
//     { label: 'HSL with Alpha', value: 'HSLA' }
// ]);

</script>

<template>
    <Toolbar
        :pt="{
            root: { 
                style: { 
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                } 
            }
        }"
    >
        <template #start>
            <Button label="New" icon="pi pi-plus" class="mr-2" />
<!--            <Button label="Delete" icon="pi pi-times" severity="danger" />-->
        </template>

        <template #end>
            <!-- Still not sure if i need something here.. -->
        </template>
    </Toolbar>
    Tint & Shade config
</template>

<style scoped lang="scss">

</style>
