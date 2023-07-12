import { useColorStore } from '../stores/main.ts';
import { colorItem, splitterOptions, tintShadeItem } from '../interfaces/config.ts';
import Values from 'values.js';
import { ref } from 'vue';

const colorStore = useColorStore();

const getIndent = (): string => {
    switch (colorStore.getOutputOptions.indent) {
        case '2':
            return '  ';
        case '4':
            return '    ';
        case 'TAB':
            return '\t';
        case 'NONE':
            return '';
        default:
            return '';
    }
};
const getSplitter = (splitterOption: splitterOptions): string => {
    switch (splitterOption) {
        case 'HYPHEN':
            return '-';
        case 'UNDERSCORE':
            return '-';
        case 'NONE':
            return '';
        default:
            return '';
    }
};

export const GeneratorService = {
    generateVariableName(color: colorItem, tintShade: tintShadeItem): string {
        const splitter = getSplitter(colorStore.getOutputOptions.variableSplitter);
        let prefix = '';
        if (tintShade.prefix !== null && tintShade.prefix.trim() !== '') {
            prefix = `${tintShade.prefix.trim()}${splitter}`;
        }
        let suffix = '';
        if (tintShade.suffix !== null && tintShade.suffix.trim() !== '') {
            suffix = `${splitter}${tintShade.suffix.trim()}`;
        }
        return `${prefix}${color.name}${suffix}`;
    },
    generateCssVariables() {
        const colors = ref<colorItem[]>(colorStore.getColors);
        const tintShades = ref<tintShadeItem[]>(colorStore.getTintShades);
        let cssVariable = ':root {\n';
        for (const color of colors.value) {
            const colorValues = new Values(color.code);
            for (const tintShade of tintShades.value) {
                const tintShadeColor = new Values(color.code);
                if (tintShade.type === 'tint') {
                    tintShadeColor.setColor(colorValues.tint(tintShade.weight).hexString());
                }
                if (tintShade.type === 'shade') {
                    tintShadeColor.setColor(colorValues.shade(tintShade.weight).hexString());
                }
                
                cssVariable += `${getIndent()}--${this.generateVariableName(color,tintShade)}: ${tintShadeColor.hexString()};\n`;
            }
        }
        cssVariable += '}';

        return cssVariable;
    },
    generateClassName(color: colorItem, tintShade: tintShadeItem): string {
        const splitter = getSplitter(colorStore.getOutputOptions.classSplitter);
        let classPrefix = '';
        const outputOptions = colorStore.getOutputOptions;
        if (outputOptions.classPrefix !== null && outputOptions.classPrefix.trim() !== '') {
            classPrefix = `${outputOptions.classPrefix.trim()}${splitter}`;
        }
        let classSuffix = '';
        if (outputOptions.classSuffix !== null && outputOptions.classSuffix.trim() !== '') {
            classSuffix = `${splitter}${outputOptions.classSuffix.trim()}`;
        }
        return `${classPrefix}${this.generateVariableName(color, tintShade)}${classSuffix}`;
    },
    generateCssClasses() {
        const colors = ref<colorItem[]>(colorStore.getColors);
        const tintShades = ref<tintShadeItem[]>(colorStore.getTintShades);
        let cssClasses = '';
        for (const color of colors.value) {
            const colorValues = new Values(color.code);
            for (const tintShade of tintShades.value) {
                const tintShadeColor = new Values(color.code);
                if (tintShade.type === 'tint') {
                    tintShadeColor.setColor(colorValues.tint(tintShade.weight).hexString());
                }
                if (tintShade.type === 'shade') {
                    tintShadeColor.setColor(colorValues.shade(tintShade.weight).hexString());
                }
                let value = tintShadeColor.hexString();
                if (colorStore.getOutputOptions.variablesInClass && colorStore.getOutputOptions.cssVariables) {
                    value = `var(${this.generateVariableName(color, tintShade)})`;
                }
                cssClasses += `.${this.generateClassName(color, tintShade)} {\n${getIndent()}background-color: ${value}\n}\n`;
            }
        }

        return cssClasses;
    },
    getOutput() {
        const outputOptions = colorStore.getOutputOptions;
        let output = '';
        if (outputOptions.cssVariables) {
            output += this.generateCssVariables()+'\n';
        }
        if (outputOptions.cssClasses) {
            output += this.generateCssClasses()+'\n';
        }
        
        return output;
    }
}
