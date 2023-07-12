import { defineStore } from 'pinia';
import { colorItem, newColorItem, newTintShadeItem, outputOptions, tintShadeItem } from "../interfaces/config.ts";

// useMainStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMainStore = defineStore('main', {
    state: () => ({
        curTheme: 'arya-blue',
    }),
    getters: {
        currentTheme: state => state.curTheme,
    },
    actions: {
        updateTheme(theme: string) {
            this.curTheme = theme;
        }
    },
    persist: true,
});

const getId = (array: colorItem[] | tintShadeItem[]): number => {
    let id: number = 0;
    if (array.length > 0) {
        id = array.sort((a,b) => b.id - a.id)[0].id+1;
    }
    return id;
}

export const useColorStore = defineStore('colors', {
    state: () => ({
        colors: [] as colorItem[],
        tintShades: [] as tintShadeItem[],
        outputOptions: {
            cssVariables: true,
            cssClasses: false,
            variablesInClass: false,
            classPrefix: '',
            classSuffix: '',
            classSplitter: 'NONE',
            variableSplitter: 'NONE',
            indent: '2',
        } as outputOptions,
    }),
    getters: {
        getColors: state => state.colors,
        getTintShades: state => state.tintShades,
        getOutputOptions: state => state.outputOptions,
    },
    actions: {
        addColor(color: newColorItem) {
            this.colors.push({
                id: getId(this.colors),
                ...color
            });
        },
        deleteColor(colorId: number) {
            const index = this.colors.findIndex(x => x.id === colorId);
            this.colors.splice(index, 1);
        },
        addTintShade(tintShade: newTintShadeItem) {
            this.tintShades.push({
                id: getId(this.tintShades),
                ...tintShade
            });
        },
        deleteTintShade(tintShadeId: number) {
            const index = this.tintShades.findIndex(x => x.id === tintShadeId);
            this.tintShades.splice(index, 1);
        }
    },
    persist: true,
});
