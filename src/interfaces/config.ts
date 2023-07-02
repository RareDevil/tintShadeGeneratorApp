export interface colorItem {
    id: number;
    name: string;
    code: string;
}

export interface newColorItem extends  Omit<colorItem, "id"> { }

export type tintShadeType = 'tint' | 'shade' | 'base';
export interface tintShadeItem {
    id: number;
    type: tintShadeType;
    weight: number;
    prefix: string;
    suffix: string;
}

export interface newTintShadeItem extends  Omit<tintShadeItem, "id"> { }
