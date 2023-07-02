<script setup lang="ts">
import { usePrimeVue } from 'primevue/config';
import { useMainStore } from "../stores/main.ts"
import Dropdown from 'primevue/dropdown';
import { ref } from "vue";

const store = useMainStore();
const PrimeVue = usePrimeVue();

const selectedTheme = ref(store.currentTheme);
const themes = ref([
    { name: 'Saga blue (Light)', code: 'saga-blue' },
    { name: 'Saga green (Light)', code: 'saga-green' },
    { name: 'Saga orange (Light)', code: 'saga-orange' },
    { name: 'Saga purple (Light)', code: 'saga-purple' },
    { name: 'Vela blue (Dimmed)', code: 'vela-blue' },
    { name: 'Vela green (Dimmed)', code: 'vela-green' },
    { name: 'Vela orange (Dimmed)', code: 'vela-orange' },
    { name: 'Vela purple (Dimmed)', code: 'vela-purple' },
    { name: 'Arya blue (Dark)', code: 'arya-blue' },
    { name: 'Arya green (Dark)', code: 'arya-green' },
    { name: 'Arya orange (Dark)', code: 'arya-orange' },
    { name: 'Arya purple (Dark)', code: 'arya-purple' },
]);

const changeDetection = () => {
    if (selectedTheme.value !== store.currentTheme) {
        // @ts-ignore
        PrimeVue.changeTheme(store.currentTheme, selectedTheme.value, 'theme-stylesheet', () => {});
        store.updateTheme(selectedTheme.value);
    }
}

</script>

<template>
    <div class="p-3">
        Settings<br>
        Change theme
        <Dropdown 
            v-model="selectedTheme" 
            :options="themes" 
            optionLabel="name"
            optionValue="code"
            placeholder="Select a theme" 
            class="w-full md:w-14rem"
            :change="changeDetection()"
        />
    </div>
</template>

<style scoped lang="scss">

</style>
