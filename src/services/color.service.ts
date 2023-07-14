/* w3color.js ver.1.18 by w3schools.com (Do not remove this line) */
/* This code was taken from w3color.js and modified by RareDevil */

interface ColorObject {
    red: number;
    green: number;
    blue: number;
    hue: number;
    sat: number;
    lightness: number;
    whiteness: number;
    blackness: number;
    cyan: number;
    magenta: number;
    yellow: number;
    black: number;
    ncol: string;
    opacity: number;
    valid?: boolean;
}
interface Irgb {
    r: number;
    g: number;
    b: number;
}

const nameColorsArray = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
const hexColorsArray = ['f0f8ff', 'faebd7', '00ffff', '7fffd4', 'f0ffff', 'f5f5dc', 'ffe4c4', '000000', 'ffebcd', '0000ff', '8a2be2', 'a52a2a', 'deb887', '5f9ea0', '7fff00', 'd2691e', 'ff7f50', '6495ed', 'fff8dc', 'dc143c', '00ffff', '00008b', '008b8b', 'b8860b', 'a9a9a9', 'a9a9a9', '006400', 'bdb76b', '8b008b', '556b2f', 'ff8c00', '9932cc', '8b0000', 'e9967a', '8fbc8f', '483d8b', '2f4f4f', '2f4f4f', '00ced1', '9400d3', 'ff1493', '00bfff', '696969', '696969', '1e90ff', 'b22222', 'fffaf0', '228b22', 'ff00ff', 'dcdcdc', 'f8f8ff', 'ffd700', 'daa520', '808080', '808080', '008000', 'adff2f', 'f0fff0', 'ff69b4', 'cd5c5c', '4b0082', 'fffff0', 'f0e68c', 'e6e6fa', 'fff0f5', '7cfc00', 'fffacd', 'add8e6', 'f08080', 'e0ffff', 'fafad2', 'd3d3d3', 'd3d3d3', '90ee90', 'ffb6c1', 'ffa07a', '20b2aa', '87cefa', '778899', '778899', 'b0c4de', 'ffffe0', '00ff00', '32cd32', 'faf0e6', 'ff00ff', '800000', '66cdaa', '0000cd', 'ba55d3', '9370db', '3cb371', '7b68ee', '00fa9a', '48d1cc', 'c71585', '191970', 'f5fffa', 'ffe4e1', 'ffe4b5', 'ffdead', '000080', 'fdf5e6', '808000', '6b8e23', 'ffa500', 'ff4500', 'da70d6', 'eee8aa', '98fb98', 'afeeee', 'db7093', 'ffefd5', 'ffdab9', 'cd853f', 'ffc0cb', 'dda0dd', 'b0e0e6', '800080', '663399', 'ff0000', 'bc8f8f', '4169e1', '8b4513', 'fa8072', 'f4a460', '2e8b57', 'fff5ee', 'a0522d', 'c0c0c0', '87ceeb', '6a5acd', '708090', '708090', 'fffafa', '00ff7f', '4682b4', 'd2b48c', '008080', 'd8bfd8', 'ff6347', '40e0d0', 'ee82ee', 'f5deb3', 'ffffff', 'f5f5f5', 'ffff00', '9acd32'];

const roundDecimals = (c: ColorObject) => {
    c.red = Number(c.red.toFixed(0));
    c.green = Number(c.green.toFixed(0));
    c.blue = Number(c.blue.toFixed(0));
    c.hue = Number(c.hue.toFixed(0));
    c.sat = Number(c.sat.toFixed(2));
    c.lightness = Number(c.lightness.toFixed(2));
    c.whiteness = Number(c.whiteness.toFixed(2));
    c.blackness = Number(c.blackness.toFixed(2));
    c.cyan = Number(c.cyan.toFixed(2));
    c.magenta = Number(c.magenta.toFixed(2));
    c.yellow = Number(c.yellow.toFixed(2));
    c.black = Number(c.black.toFixed(2));
    c.ncol = c.ncol.substring(0, 1) + Math.round(Number(c.ncol.substring(1)));
    c.opacity = Number(c.opacity.toFixed(2));
    return c;
}
const rgbToHsl = (r: number, g: number, b: number) => {
    let min, max, i, l, s, maxcolor, h=0, rgb = [];
    rgb[0] = r / 255;
    rgb[1] = g / 255;
    rgb[2] = b / 255;
    min = rgb[0];
    max = rgb[0];
    maxcolor = 0;
    for (i = 0; i < rgb.length - 1; i++) {
        if (rgb[i + 1] <= min) {min = rgb[i + 1];}
        if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
    }
    if (maxcolor == 0) {
        h = (rgb[1] - rgb[2]) / (max - min);
    }
    if (maxcolor == 1) {
        h = 2 + (rgb[2] - rgb[0]) / (max - min);
    }
    if (maxcolor == 2) {
        h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }
    if (isNaN(h)) {h = 0;}
    h = h * 60;
    if (h < 0) {h = h + 360; }
    l = (min + max) / 2;
    if (min == max) {
        s = 0;
    } else {
        if (l < 0.5) {
            s = (max - min) / (max + min);
        } else {
            s = (max - min) / (2 - max - min);
        }
    }
    // s = s; ????
    return {h : h, s : s, l : l};
}
const rgbToHwb = (r: number, g: number, b: number) => {
    let h, w, bl;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;
    if (chroma == 0) {
        h = 0;
    } else if (r == max) {
        h = (((g - b) / chroma) % 6) * 360;
    } else if (g == max) {
        h = ((((b - r) / chroma) + 2) % 6) * 360;
    } else {
        h = ((((r - g) / chroma) + 4) % 6) * 360;
    }
    w = min;
    bl = 1 - max;
    return {h : h, w : w, b : bl};
}
const rgbToCmyk = (r: number, g: number, b: number) => {
    let c, m, y, k;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    const max = Math.max(r, g, b);
    k = 1 - max;
    if (k == 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        c = (1 - r - k) / (1 - k);
        m = (1 - g - k) / (1 - k);
        y = (1 - b - k) / (1 - k);
    }
    return {c : c, m : m, y : y, k : k};
}
const hueToNcol = (hue: number): string => {
    while (hue >= 360) {
        hue = hue - 360;
    }
    if (hue < 60) {return "R" + (hue / 0.6); }
    if (hue < 120) {return "Y" + ((hue - 60) / 0.6); }
    if (hue < 180) {return "G" + ((hue - 120) / 0.6); }
    if (hue < 240) {return "C" + ((hue - 180) / 0.6); }
    if (hue < 300) {return "B" + ((hue - 240) / 0.6); }
    if (hue < 360) {return "M" + ((hue - 300) / 0.6); }
    
    return '';
}
const toHex = (n: number) => {
    let hex = n.toString(16);
    while (hex.length < 2) {hex = "0" + hex; }
    return hex;
}
const emptyObject = {
    red : 0,
    green : 0,
    blue : 0,
    hue : 0,
    sat : 0,
    lightness : 0,
    whiteness : 0,
    blackness : 0,
    cyan : 0,
    magenta : 0,
    yellow : 0,
    black : 0,
    ncol : "R",
    opacity : 1,
    valid : false
};

export const ColorService = {
    toHexString : function (c: ColorObject) {
        const r = toHex(c.red);
        const g = toHex(c.green);
        const b = toHex(c.blue);
        return "#" +  r + g + b;
    },
    toHexaString : function (c: ColorObject) {
        const r = toHex(c.red);
        const g = toHex(c.green);
        const b = toHex(c.blue);
        const a = toHex(Math.floor(255 * c.opacity));
        return "#" +  r + g + b + a;
    },
    toRgbString : function (c: ColorObject) {
        return "rgb(" + c.red + ", " + c.green + ", " + c.blue + ")";
    },
    toRgbaString : function (c: ColorObject) {
        return "rgba(" + c.red + ", " + c.green + ", " + c.blue + ", " + c.opacity + ")";
    },
    toHwbString : function (c: ColorObject) {
        return "hwb(" + c.hue + ", " + Math.round(c.whiteness * 100) + "%, " + Math.round(c.blackness * 100) + "%)";
    },
    toHwbStringDecimal : function (c: ColorObject) {
        return "hwb(" + c.hue + ", " + c.whiteness + ", " + c.blackness + ")";
    },
    toHwbaString : function (c: ColorObject) {
        return "hwba(" + c.hue + ", " + Math.round(c.whiteness * 100) + "%, " + Math.round(c.blackness * 100) + "%, " + c.opacity + ")";
    },
    toHslString : function (c: ColorObject) {
        return "hsl(" + c.hue + ", " + Math.round(c.sat * 100) + "%, " + Math.round(c.lightness * 100) + "%)";
    },
    toHslStringDecimal : function (c: ColorObject) {
        return "hsl(" + c.hue + ", " + c.sat + ", " + c.lightness + ")";
    },
    toHslaString : function (c: ColorObject) {
        return "hsla(" + c.hue + ", " + Math.round(c.sat * 100) + "%, " + Math.round(c.lightness * 100) + "%, " + c.opacity + ")";
    },
    toCmykString : function (c: ColorObject) {
        return "cmyk(" + Math.round(c.cyan * 100) + "%, " + Math.round(c.magenta * 100) + "%, " + Math.round(c.yellow * 100) + "%, " + Math.round(c.black * 100) + "%)";
    },
    toCmykStringDecimal : function (c: ColorObject) {
        return "cmyk(" + c.cyan + ", " + c.magenta + ", " + c.yellow + ", " + c.black + ")";
    },
    toNcolString : function (c: ColorObject) {
        return c.ncol + ", " + Math.round(c.whiteness * 100) + "%, " + Math.round(c.blackness * 100) + "%";
    },
    toNcolStringDecimal : function (c: ColorObject) {
        return c.ncol + ", " + c.whiteness + ", " + c.blackness;
    },
    toNcolaString : function (c: ColorObject) {
        return c.ncol + ", " + Math.round(c.whiteness * 100) + "%, " + Math.round(c.blackness * 100) + "%, " + c.opacity;
    },
    colorObject(rgb: Irgb, a?: number, h?: number, s?: number): ColorObject {
        let hsl, hwb, cmyk, ncol, color, hue, sat;
        if (!rgb) {return emptyObject;}
        if (a === null || a === undefined) {a = 1;}
        hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
        cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        hue = (h || hsl.h);
        sat = (s || hsl.s);
        ncol = hueToNcol(hue);
        color = {
            red : rgb.r,
            green : rgb.g,
            blue : rgb.b,
            hue : hue,
            sat : sat,
            lightness : hsl.l,
            whiteness : hwb.w,
            blackness : hwb.b,
            cyan : cmyk.c,
            magenta : cmyk.m,
            yellow : cmyk.y,
            black : cmyk.k,
            ncol : ncol,
            opacity : a,
            valid : true
        };
        color = roundDecimals(color);
        return color;
    },
    isHex(x: string): boolean {
        return ('0123456789ABCDEFabcdef'.indexOf(x) > -1);
    },
    getRandomHexColor() {
        const random = Math.floor(Math.random() * hexColorsArray.length);
        return {
            name: nameColorsArray[random],
            hex: hexColorsArray[random]
        };
    }
}
