<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { ref } from 'vue';
import { colorItem, tintShadeItem } from "../interfaces/config.ts";
import { useColorStore } from "../stores/main.ts";
import Values from 'values.js'

interface accordionContentItem extends tintShadeItem {
    backgroundHex: string;
    colorHex: string;
}

interface accordionItem extends colorItem{
    tintShades: accordionContentItem[];
}

const store = useColorStore();
const colors = ref<colorItem[]>(store.getColors);
const tintShades = ref<tintShadeItem[]>(store.getTintShades);
const accordingItems = ref<accordionItem[]>([]);

for (const color of colors.value) {
    const colorValues = new Values(color.code);
    const accordionContentItem: accordionContentItem[] = [];
    for (const tintShade of tintShades.value) {
        const tintShadeColor = new Values(color.code);
        if (tintShade.type === 'tint') {
            tintShadeColor.setColor(colorValues.tint(tintShade.weight).hexString());
        }
        if (tintShade.type === 'shade') {
            tintShadeColor.setColor(colorValues.shade(tintShade.weight).hexString());
        }
        
        const red = tintShadeColor.rgb[0];
        const green = tintShadeColor.rgb[1];
        const blue = tintShadeColor.rgb[2];
        let colorHex = 'rgb(255, 255, 255)';
        if ((red*0.299 + green*0.587 + blue*0.114) > 150) {
            colorHex = 'rgb(0,0,0)';
        }
        
        accordionContentItem.push({
            backgroundHex: tintShadeColor.hexString(),
            colorHex: colorHex,
            ...tintShade,
        });
    }
    accordingItems.value.push({
        tintShades: accordionContentItem,
        ...color
    });
}

</script>

<template>
    <Accordion :multiple="true" :activeIndex="[0]">
        <AccordionTab 
            v-for="item in accordingItems" 
            :key="item.id"
            :header="item.name"
            :pt="{
                headerAction: { 
                    style: { 
                        borderLeft: 'none',
                        borderRight: 'none',
                        fontSize: '1.5rem',
                        borderRadius: '0',
                    } 
                },
                content: {
                    style: {
                        padding: 0,
                        borderLeft: 'none',
                        borderRight: 'none',
                    }
                }
            }"
        >
        <div class="flex flex-wrap justify-content-start">
            <div v-for="tintShade in item.tintShades" 
                 class="text-lg p-4 px-6 flex flex-grow-1 align-items-center justify-content-center" 
                 :style="{ backgroundColor: tintShade.backgroundHex, color: tintShade.colorHex }"
            >
                {{ tintShade.backgroundHex }}<br>
                Type: {{ tintShade.type }}<br>
                Prefix: {{ tintShade.prefix }}<br>
                Suffix: {{ tintShade.suffix }}<br>
                Weight: {{ tintShade.weight }}<br>
            </div>
        </div>
        </AccordionTab>
    </Accordion>
</template>

<style scoped lang="scss">

</style>
<style lang="scss">
.p-accordion .p-accordion-tab:first-child .p-accordion-header .p-accordion-header-link {
    border-top: none;
}
</style>
