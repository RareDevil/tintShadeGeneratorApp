import { defineStore } from 'pinia';
import { colorItem, newColorItem } from "../interfaces/config.ts";

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

export const useColorStore = defineStore('colors', {
    state: () => ({
        colors: [] as colorItem[],
    }),
    getters: {
        getColors: state => state.colors,
    },
    actions: {
        addColor(color: newColorItem): colorItem {
            let id: number = 0;
            if (this.colors.length > 0) {
                id = this.colors.sort((a,b) => b.id - a.id)[0].id+1;
            }
            const newColor: colorItem = {
                id: id,
                ...color
            };
            this.colors.push(newColor);
            return newColor;
        },
        deleteColor(colorId: number) {
            const index = this.colors.findIndex(x => x.id === colorId);
            this.colors.splice(index, 1);
        }
    },
    persist: true,
});
