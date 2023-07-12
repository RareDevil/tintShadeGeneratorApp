<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, ref } from "vue";
import { useMainStore } from "../stores/main.ts"
import { GeneratorService } from '../services/generator.service.ts' 
const store = useMainStore();

const editorValue = GeneratorService.getOutput();
const editorContainer = ref();
const currentTheme = store.currentTheme.split('-')[0];
const theme = ref("myDarkTheme");
if (currentTheme == 'saga'){
    theme.value = 'myLightTheme';
}
const documentStyle = getComputedStyle(document.documentElement);
monaco.editor.defineTheme('myDarkTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: { 'editor.background': documentStyle.getPropertyValue('--surface-overlay'), }
});
monaco.editor.defineTheme('myLightTheme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: { 'editor.background': documentStyle.getPropertyValue('--surface-overlay'), }
});
// Generate code here...

// Stop generate code here...
onMounted(() => {
    monaco.editor.create(editorContainer.value, {
        value: editorValue,
        language: 'css',
        automaticLayout: true,
        readOnly: true,
        theme: theme.value,
        padding: {
            top: 5,
        },
    });
});


</script>

<template>
    <div ref="editorContainer" class="h-full"></div>
</template>

<style scoped lang="scss">
</style>
