<script setup lang="ts">
import { ref } from "vue";
import DataTable, { DataTableRowEditCancelEvent, DataTableRowEditSaveEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from "primevue/inputtext";
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import { colorItem } from "../../interfaces/config.ts";
import { useColorStore } from "../../stores/main.ts"

const store = useColorStore();
const colors = ref<colorItem[]>(store.getColors);
const editingRows = ref<colorItem[]>([]);
const selectedColors = ref<colorItem[]>([]);
const disableDelete = ref<boolean>(true);

const validateItem = (item: colorItem): boolean => {
    let validData = true;

    if (item.name.trim() === '') {
        validData = false;
    }
    if (item.code.trim() === '') {
        validData = false;
    }
    
    return validData;
}

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
    if (!validateItem(event.newData)) {
        editingRows.value.push(event.data);
        return;
    }
    colors.value[event.index] = event.newData;
};
const onRowEditCancel = (event: DataTableRowEditCancelEvent) => {
    if (validateItem(event.data)) {
        return;
    }
    editingRows.value.push(event.data);
}

const addNewColor = () => {
    store.addColor({
        name: 'new color',
        code: '#fff',
    });
};
const deleteColors = () => {
    if (selectedColors.value.length === 0) {
        return;
    }
    for (const selectedColor of selectedColors.value) {
        if (editingRows.value.some(x => x.id === selectedColor.id)) {
            const index = editingRows.value.findIndex(x => x.id === selectedColor.id);
            editingRows.value.splice(index, 1);
        }
        store.deleteColor(selectedColor.id);
    }
    selectedColors.value = [];
    disableDelete.value = true;
};
const onRowSelect = () => {
    disableDelete.value = (selectedColors.value.length <= 0);
};
const onRowSelectAll = () => {
    disableDelete.value = false;
};
const onRowUnselectAll = () => {
    disableDelete.value = true;
};

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
            <Button @click="addNewColor" label="New" icon="pi pi-plus" class="mr-2" />
            <Button @click="deleteColors" label="Delete" icon="pi pi-times" severity="danger" :disabled="disableDelete" />
        </template>

        <template #end>
            <!-- Still not sure if i need something here.. -->
        </template>
    </Toolbar>
    <div class="data-table-wrapper">
        <DataTable
            v-model:selection="selectedColors"
            v-model:editingRows="editingRows" 
            :value="colors" 
            editMode="row" 
            dataKey="id"
            @row-edit-save="onRowEditSave"
            @row-edit-cancel="onRowEditCancel"
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
            <Column field="name" header="Name">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" style="width: 100%" />
                </template>
            </Column>
            <Column field="code" header="code" style="width: 30%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" style="width: 100%" />
                </template>
                <template #body="{ data, field }">
                    <div class="grid grid-nogutter align-items-center gap-2">
                        <div class="col-fixed flex" style="width:2rem;">
                            <Avatar :style="`background-color:${data[field]};`" />
                        </div>
                        <div class="col">
                            <span>{{ data[field] }}</span>
                        </div>
                    </div>
                    <div>
                        
                    </div>
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
