<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, ref } from "vue";
import { useColorStore, useMainStore } from "../stores/main.ts"
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import { colorItem, tintShadeItem } from "../interfaces/config.ts";
import Values from "values.js";
const store = useMainStore();
const colorStore = useColorStore();
const colors = ref<colorItem[]>(colorStore.getColors);
const tintShades = ref<tintShadeItem[]>(colorStore.getTintShades);
let editorValue = ':root {\n';
for (const color of colors.value) {
    const colorValues = new Values(color.code);
    // const accordionContentItem: accordionContentItem[] = [];
    for (const tintShade of tintShades.value) {
        const tintShadeColor = new Values(color.code);
        if (tintShade.type === 'tint') {
            tintShadeColor.setColor(colorValues.tint(tintShade.weight).hexString());
        }
        if (tintShade.type === 'shade') {
            tintShadeColor.setColor(colorValues.shade(tintShade.weight).hexString());
        }
        let prefix = '';
        if (tintShade.prefix !== null && tintShade.prefix.trim() !== '') {
            prefix = `${tintShade.prefix.trim()}-`
        }
        let suffix = '';
        if (tintShade.suffix !== null && tintShade.suffix.trim() !== '') {
            suffix = `-${tintShade.suffix.trim()}`
        }
        editorValue += `    --${prefix}${color.name}${suffix}: ${tintShadeColor.hexString()};\n`;
    }
}
editorValue += '}';
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
