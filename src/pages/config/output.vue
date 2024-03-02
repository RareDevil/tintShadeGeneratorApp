<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import ToggleButton from 'primevue/togglebutton';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { ref, watchEffect } from "vue";
import { useColorStore } from "../../stores/main.ts";

const store = useColorStore();
const options = store.getOutputOptions;
// -?[_a-zA-Z]+[_a-zA-Z0-9-]* css validator
const splitterOptions = ref([
    { name: 'Underscore ( _ )', code: 'UNDERSCORE' },
    { name: 'Hyphen ( - )', code: 'HYPHEN' },
    { name: 'None', code: 'NONE' },
]);
const indentOptions = ref([
    { name: 'No indent', code: 'NONE' },
    { name: 'Two spaces', code: '2' },
    { name: 'Four spaces', code: '4' },
    { name: 'Tabs', code: 'TAB' },
]);
const cssColorOptions = ref([
    { name: 'Hexadecimal', code: 'hex' },
    { name: 'Hexadecimal with transparency', code: 'hexa' },
    { name: 'RGB', code: 'rgb' },
    { name: 'RGBA', code: 'rgba' },
    { name: 'HSL', code: 'hsl' },
    { name: 'HSLA', code: 'hsla' },
])

const disableVariable = ref(true);
watchEffect(() => {
    disableVariable.value = !(options.cssVariables && options.cssClasses);
});

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
            This is where you define all the stuff for the output. More options may come as the app is being developed.
<!--            <Button label="New" icon="pi pi-plus" class="mr-2" />-->
            <!--            <Button label="Delete" icon="pi pi-times" severity="danger" />-->
        </template>

        <template #end>
            <!-- Still not sure if i need something here.. -->
        </template>
    </Toolbar>
    <div class="grid m-0 select-none">
        <div class="col-4 field">
            <label>Generate Css variables</label><br>
            <ToggleButton v-model="options.cssVariables" />
        </div>
        <div class="col-4 field">
            <label>Generate Css classes</label><br>
            <ToggleButton v-model="options.cssClasses" />
        </div>
        <div class="col-4 field">
            <label>Use variables in classes</label><br>
            <ToggleButton v-model="options.variablesInClass" :disabled="disableVariable" />
        </div>
        <div class="col-6">
            <div class="field">
                <label for="classprefix">Class prefix</label>
                <InputText id="classprefix" type="text" v-model="options.classPrefix" class="w-full" :disabled="!options.cssClasses"/>
            </div>
        </div>
        <div class="col-6">
            <div class="field">
                <label for="classsuffix">Class suffix</label>
                <InputText id="classsuffix" type="text" v-model="options.classSuffix" class="w-full" :disabled="!options.cssClasses" />
            </div>
        </div>
        <div class="col-6">
            <div class="field">
                <label>Class splitter between prefix, name and suffix</label>
                <Dropdown
                    v-model="options.classSplitter" 
                    :options="splitterOptions" 
                    optionLabel="name" 
                    optionValue="code" 
                    class="w-full" 
                    :disabled="!options.cssClasses" 
                />
            </div>
        </div>
        <div class="col-6">
            <div class="field">
                <label>Css varialble splitter between prefix, name and suffix</label>
                <Dropdown 
                    v-model="options.variableSplitter" 
                    :options="splitterOptions" 
                    optionLabel="name" 
                    optionValue="code" 
                    class="w-full" 
                    :disabled="!options.cssVariables" 
                />
            </div>
        </div>
        <div class="col-6">
            <div class="field">
                <label>How should the indent be made?</label>
                <Dropdown
                    v-model="options.indent"
                    :options="indentOptions"
                    optionLabel="name"
                    optionValue="code"
                    class="w-full"
                />
            </div>
        </div>
        <div class="col-6">
            <div class="field">
                <label>What format should be used for the color?</label>
                <Dropdown
                    v-model="options.cssColor"
                    :options="cssColorOptions"
                    optionLabel="name"
                    optionValue="code"
                    class="w-full"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
