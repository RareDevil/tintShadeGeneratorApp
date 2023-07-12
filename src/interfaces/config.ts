export interface colorItem {
    id: number;
    name: string;
    code: string;
}

export interface newColorItem extends Omit<colorItem, "id"> { }

export type tintShadeType = 'tint' | 'shade' | 'base';
export interface tintShadeItem {
    id: number;
    type: tintShadeType;
    weight: number;
    prefix: string;
    suffix: string;
}

export interface newTintShadeItem extends Omit<tintShadeItem, "id"> { }

type splitterOptions = '-' | '_' | 'NONE';
type indentOptions = '2' | '4' | 'TAB' | 'NONE';
export interface outputOptions {
    cssVariables: boolean;
    cssClasses: boolean;
    variablesInClass: boolean;
    classPrefix: string;
    classSuffix: string;
    classSplitter: splitterOptions;
    variableSplitter: splitterOptions;
    indent: indentOptions;
}
