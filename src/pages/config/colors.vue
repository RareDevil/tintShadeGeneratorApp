<script setup lang="ts">
import { ref } from "vue";
import DataTable, { DataTableRowEditCancelEvent, DataTableRowEditSaveEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from "primevue/inputtext";
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import OverlayPanel from 'primevue/overlaypanel';
import { ColorPicker } from 'vue-accessible-color-picker'
import Values from 'values.js';
import { colorItem } from "../../interfaces/config.ts";
import { useColorStore } from "../../stores/main.ts";
import { ColorService } from '../../services/color.service.ts';

const store = useColorStore();
const colors = ref<colorItem[]>(store.getColors);
const editingRows = ref<colorItem[]>([]);
const selectedColors = ref<colorItem[]>([]);
const disableDelete = ref<boolean>(true);
const op = ref();
const toggle = (event: any) => {
    op.value.toggle(event);
}

const validateItem = (item: colorItem): boolean => {
    if (item.name.trim() === '') {
        return false;
    }
    const code = item.code;
    if (code.trim() === '') {
        return false;
    }
    try {
        const color = new Values(code);
        console.log(color);
    } catch {
        return false;
    }
    
    return true;
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
    const newColor = ColorService.getRandomHexColor();
    store.addColor({
        name: newColor.name,
        code: '#'+newColor.hex,
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

const codeSupport = { 
    value: `<h4 class='text-white'>Supports</h4>
            <ul>
                <li>&lt;color value&gt;</li>
                <ul>
                    <li>Hexadecimal RGB value: #RGB #RRGGBB</li>
                    <li>#RGBA #RRGGBBAA (4 and 8-digit hexadecimal RGBA notation)</li>
                    <li>RGB/A - CSS Color Module Level 3 and 4 (number, percentage)</li>
                    <li>HSL/A - CSS Color Module Level 3 and 4 (number, deg, rad, turn)</li>
                </ul>
                <li>&lt;color keyword&gt;</li>
                <ul>
                    <li>One of the pre-defined color keywords.</li>
                </ul>
                <li>transparent</li>
                <ul>
                    <li>Shorthand for transparent black, rgba(0,0,0,0).</li>
                </ul>
            </ul>`, 
    escape: true,
    class: 'code-support-help'
};

const updateColor = (eventData, color) => {
    color.code = eventData.cssColor;
}

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
            <Column field="code" style="width: 30%">
                <template #header>
                    <span>Color code</span><span v-tooltip.left="codeSupport" class="material-icons cursor-pointer ml-2">help</span>
                </template>
                <template #editor="{ data, field }">
                    <div class="grid grid-nogutter align-items-center gap-2">
                        <InputText v-model="data[field]" style="width:100%" @focus="toggle" />
                        <OverlayPanel ref="op" style="width:20rem">
                            <ColorPicker 
                                :color="data[field]"
                                :visible-formats="['hex']"
                                default-format="hex"
                                @color-change="updateColor($event, data)"
                            />
                        </OverlayPanel>
                    </div>
                </template>
                <template #body="{ data, field }">
                    <div class="grid grid-nogutter align-items-center gap-2">
                        <div class="col-fixed flex" style="width:2rem;">
                            <Avatar :style="`background-color:${data[field]}; border: 1px solid var(--surface-border)`" />
                        </div>
                        <div class="col">
                            <span>{{ data[field] }}</span>
                        </div>
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
<style lang="scss">
.code-support-help {
    max-width: 35rem;
    
    .p-tooltip-text {
        white-space: normal;
        
        h4 {
            margin-top: 0;
            margin-bottom: 0.5rem;
        }
        ul {
            margin: 0;
            padding-left: 1.5rem;
        }
    }
}
</style>
