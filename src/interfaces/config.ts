export interface colorItem {
    id: number;
    name: string;
    code: string;
}

export interface newColorItem extends  Omit<colorItem, "id"> {
    
}
