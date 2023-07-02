<script setup lang="ts">
import { ref } from "vue";
import DataTable, { DataTableRowEditSaveEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from "primevue/inputtext";
import InputNumber from 'primevue/inputnumber';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { tintShadeItem } from "../../interfaces/config.ts";
import { useColorStore } from "../../stores/main.ts"

const store = useColorStore();
const tintShades = ref<tintShadeItem[]>(store.getTintShades);
const editingRows = ref<tintShadeItem[]>([]);
const selectedTintShades = ref<tintShadeItem[]>([]);
const disableDelete = ref<boolean>(true);

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
    tintShades.value[event.index] = event.newData;
};

const addNewTintShade = () => {
    store.addTintShade({
        prefix: '',
        suffix: '',
        type: 'base',
        weight: 0,
    });
};
const deleteTintShades = () => {
    if (selectedTintShades.value.length === 0) {
        return;
    }
    for (const selectedTintShade of selectedTintShades.value) {
        if (editingRows.value.some(x => x.id === selectedTintShade.id)) {
            const index = editingRows.value.findIndex(x => x.id === selectedTintShade.id);
            editingRows.value.splice(index, 1);
        }
        store.deleteTintShade(selectedTintShade.id);
    }
    selectedTintShades.value = [];
    disableDelete.value = true;
};
const onRowSelect = () => {
    disableDelete.value = (selectedTintShades.value.length <= 0);
};
const onRowSelectAll = () => {
    disableDelete.value = false;
};
const onRowUnselectAll = () => {
    disableDelete.value = true;
};

const tintShadeBase = ref([
    { label: 'Tint', value: 'tint' },
    { label: 'Shade', value: 'shade' },
    { label: 'Base', value: 'base' },
]);

const prefixTooltip = 'This will be added before the color name in the output';
const suffixTooltip = 'This will be added efter the color name in the output';
const typeTooltip = 'Should the color be tinted or shaded? Base means no tinting or shading will be made.';
const weightTooltip = 'The weight of the tint/shade. The value is 0-100 and it a procentage.';

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
            <Button @click="addNewTintShade" label="New" icon="pi pi-plus" class="mr-2" />
            <Button @click="deleteTintShades" label="Delete" icon="pi pi-times" severity="danger" :disabled="disableDelete" />
        </template>

        <template #end>
            <!-- Still not sure if i need something here.. -->
        </template>
    </Toolbar>
    <div class="data-table-wrapper">
        <DataTable
            v-model:selection="selectedTintShades"
            v-model:editingRows="editingRows"
            :value="tintShades"
            editMode="row"
            dataKey="id"
            @row-edit-save="onRowEditSave"
            @row-select="onRowSelect"
            @row-select-all="onRowSelectAll"
            @row-unselect="onRowSelect"
            @row-unselect-all="onRowUnselectAll"
            stripedRows scrollable scrollHeight="100%"
            tableClass="editable-cells-table"
            tableStyle="min-width: 50rem"
            class="h-full overflow-auto"
        >
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="prefix">
                <template #header>
                    <span>Prefix</span>
                    <span v-tooltip.top="prefixTooltip" class="material-icons cursor-pointer ml-2">help</span>
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" style="width: 100%" />
                </template>
            </Column>
            <Column field="suffix">
                <template #header>
                    <span>Suffix</span>
                    <span v-tooltip.top="suffixTooltip" class="material-icons cursor-pointer ml-2">help</span>
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" style="width: 100%" />
                </template>
            </Column>
            <Column field="type">
                <template #header>
                    <span>Type</span>
                    <span v-tooltip.top="typeTooltip" class="material-icons cursor-pointer ml-2">help</span>
                </template>
                <template #editor="{ data, field }">
                    <Dropdown 
                        v-model="data[field]" 
                        :options="tintShadeBase"
                        optionLabel="label" 
                        optionValue="value"
                        placeholder="Select tint/shade"
                    />
                </template>
            </Column>
            <Column field="weight">
                <template #header>
                    <span>Weight</span>
                    <span v-tooltip.top="weightTooltip" class="material-icons cursor-pointer ml-2">help</span>
                </template>
                <template #editor="{ data, field }">
                    <InputNumber 
                        v-model="data[field]" 
                        :min="0" 
                        :max="100" 
                        :disabled="data.type == 'base'" 
                        style="width: 100%"
                        suffix="%"
                        :allowEmpty="false"
                    />
                </template>
                <template #body="{ data, field }">
                    <span :class="{ 'line-through': data.type == 'base' }">{{ data[field] }}%</span>
                </template>
            </Column>
            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
    </div>
</template>

<style scoped lang="scss">
.data-table-wrapper {
    height: calc(100% - 64px);
    overflow: auto;
}
</style>
