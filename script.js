const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const color = document.createElement("div");
const main = document.querySelector("main");
const text = document.createElement("h2");
text.innerHTML = "Press Space to generate a random color";
const btns = document.querySelectorAll(".opt");
const colorcontainer = document.createElement("div");
const colorops = document.createElement("div");
colorops.id = "colorops";
colorcontainer.id = "colorcontainer";
const ops = document.createElement("div");
const container = document.createElement("div");
const colorTableBody = document.createElement("table");
colorTableBody.createCaption();
colorTableBody.caption.textContent = "W3C Named Colors";
const table = document.createElement("div");
table.id = "table";
const entries = document.createElement("span");
entries.style.margin = "10px";
const copy = document.createElement("button");
const form = document.createElement("button");
copy.id = "copy";
form.id = "form";
const prev = document.createElement("button");
const next = document.createElement("button");
const search = document.createElement("input");
const change = document.createElement("button");
search.id = "searchInput";
search.placeholder = "Search for a color";
change.innerHTML = "Click Here";
change.classList.add("opt");
prev.innerHTML = "<=";
next.innerHTML = "=>";
prev.classList.add("table-opt");
next.classList.add("table-opt");
icon = { 'size': '30', 'fill': 'white', 'stroke': 'white', 'strokeWidth': '2' };
copy.innerHTML = `<svg class="btn" id="copy" width="${icon.size}" height="${icon.size}" viewBox="0 0 ${icon.size} ${icon.size}" 
xmlns="http://www.w3.org/2000/svg" stroke="${icon.stroke}" stroke-width="${icon.strokeWidth}">
<line x1="8" y1="8" x2="8" y2="22" />
<line x1="8" y1="8" x2="22" y2="8" />
<line x1="8" y1="22" x2="22" y2="22" />
<line x1="22" y1="8" x2="22" y2="22" />
<line x1="12" y1="5" x2="25" y2="5" />
<line x1="25" y1="5" x2="25" y2="20" />
</svg>`;
form.innerHTML = `<svg class="btn" id="format" xmlns="http://www.w3.org/2000/svg" 
viewBox="0 0 ${icon.size} ${icon.size}" width="${icon.size}" height="${icon.size}" 
stroke="${icon.stroke}" fill="${icon.fill}" stroke-width="${icon.strokeWidth}">
<circle cx="15" cy="15" r="10" fill="none"/>
<path d="M 15 5 a 2 2 1 1 1 0 20 Z" />
</svg>`;
let sel = 0, entriesLength = 10;
colorTableBody.createTHead().insertRow();
colorTableBody.tHead.rows[0].insertCell().textContent = "S. no.";
colorTableBody.tHead.rows[0].insertCell().textContent = "Color Name";
colorTableBody.tHead.rows[0].insertCell().textContent = "Hex Code";
colorTableBody.tHead.rows[0].insertCell().textContent = "Preview";
colorTableBody.tHead.rows[0].style['backgroundColor'] = 'black';
colorTableBody.tHead.rows[0].style['color'] = 'white';
color.style['font-size'] = '20px';
container.classList.add("container");
container.style['backgroundColor'] = 'black';
main.appendChild(container);
container.appendChild(text);
container.appendChild(change)
container.appendChild(colorcontainer);
colorcontainer.appendChild(color);
colorcontainer.appendChild(colorops);

let hexColor = "#";

function getRandomColor() {
    hexColor = "#";
    for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomNumber()];
    }
    console.log(hexColor);
    return hexColor;
}

function changeColor() {
    hexColor = getRandomColor();
    color.textContent = "BackGround Color = " + hexColor;
    document.body.style.backgroundColor = hexColor;
    colorops.appendChild(copy);
    colorops.appendChild(form);
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        changeColor();
        e.preventDefault();
    }
});

change.addEventListener('click', () => {
    changeColor();
});

copy.addEventListener('click', () => {
    const el = document.createElement('textarea');
    let colorVal = color.textContent.substring();
    el.value = colorVal.substring(18, colorVal.length);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy', true);
    document.body.removeChild(el);
    alert("Copied to clipboard");
});

form.addEventListener('click', () => {
    const { r, g, b } = hexToRgb(hexColor);
    const { h, s, l } = rgbToHsl(r, g, b);
    sel = (sel + 1) % 3;
    if (sel == 0) {
        color.textContent = "BackGround Color = " + hexColor;
    } else if (sel == 1) {
        color.textContent = "BackGround Color = " + `RGB(${r}, ${g}, ${b})`;
    } else {
        color.textContent = "BackGround Color = " + `HSL(${h}, ${s}%, ${l}%)`;
    }

});

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}

function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return { h, s, l };
}

const w3cNamedColors = {
    "aliceblue": "#F0F8FF",
    "antiquewhite": "#FAEBD7",
    "aqua": "#00FFFF",
    "aquamarine": "#7FFFD4",
    "azure": "#F0FFFF",
    "beige": "#F5F5DC",
    "bisque": "#FFE4C4",
    "black": "#000000",
    "blanchedalmond": "#FFEBCD",
    "blue": "#0000FF",
    "blueviolet": "#8A2BE2",
    "brown": "#A52A2A",
    "burlywood": "#DEB887",
    "cadetblue": "#5F9EA0",
    "chartreuse": "#7FFF00",
    "chocolate": "#D2691E",
    "coral": "#FF7F50",
    "cornflowerblue": "#6495ED",
    "cornsilk": "#FFF8DC",
    "crimson": "#DC143C",
    "cyan": "#00FFFF",
    "darkblue": "#00008B",
    "darkcyan": "#008B8B",
    "darkgoldenrod": "#B8860B",
    "darkgray": "#A9A9A9",
    "darkgreen": "#006400",
    "darkgrey": "#A9A9A9",
    "darkkhaki": "#BDB76B",
    "darkmagenta": "#8B008B",
    "darkolivegreen": "#556B2F",
    "darkorange": "#FF8C00",
    "darkorchid": "#9932CC",
    "darkred": "#8B0000",
    "darksalmon": "#E9967A",
    "darkseagreen": "#8FBC8F",
    "darkslateblue": "#483D8B",
    "darkslategray": "#2F4F4F",
    "darkslategrey": "#2F4F4F",
    "darkturquoise": "#00CED1",
    "darkviolet": "#9400D3",
    "deeppink": "#FF1493",
    "deepskyblue": "#00BFFF",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "dodgerblue": "#1E90FF",
    "firebrick": "#B22222",
    "floralwhite": "#FFFAF0",
    "forestgreen": "#228B22",
    "fuchsia": "#FF00FF",
    "gainsboro": "#DCDCDC",
    "ghostwhite": "#F8F8FF",
    "gold": "#FFD700",
    "goldenrod": "#DAA520",
    "gray": "#808080",
    "grey": "#808080",
    "green": "#008000",
    "greenyellow": "#ADFF2F",
    "honeydew": "#F0FFF0",
    "hotpink": "#FF69B4",
    "indianred": "#CD5C5C",
    "indigo": "#4B0082",
    "ivory": "#FFFFF0",
    "khaki": "#F0E68C",
    "lavender": "#E6E6FA",
    "lavenderblush": "#FFF0F5",
    "lawngreen": "#7CFC00",
    "lemonchiffon": "#FFFACD",
    "lightblue": "#ADD8E6",
    "lightcoral": "#F08080",
    "lightcyan": "#E0FFFF",
    "lightgoldenrodyellow": "#FAFAD2",
    "lightgray": "#D3D3D3",
    "lightgreen": "#90EE90",
    "lightgrey": "#D3D3D3",
    "lightpink": "#FFB6C1",
    "lightsalmon": "#FFA07A",
    "lightseagreen": "#20B2AA",
    "lightskyblue": "#87CEFA",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "lightsteelblue": "#B0C4DE",
    "lightyellow": "#FFFFE0",
    "lime": "#00FF00",
    "limegreen": "#32CD32",
    "linen": "#FAF0E6",
    "magenta": "#FF00FF",
    "maroon": "#800000",
    "mediumaquamarine": "#66CDAA",
    "mediumblue": "#0000CD",
    "mediumorchid": "#BA55D3",
    "mediumpurple": "#9370DB",
    "mediumseagreen": "#3CB371",
    "mediumslateblue": "#7B68EE",
    "mediumspringgreen": "#00FA9A",
    "mediumturquoise": "#48D1CC",
    "mediumvioletred": "#C71585",
    "midnightblue": "#191970",
    "mintcream": "#F5FFFA",
    "mistyrose": "#FFE4E1",
    "moccasin": "#FFE4B5",
    "navajowhite": "#FFDEAD",
    "navy": "#000080",
    "oldlace": "#FDF5E6",
    "olive": "#808000",
    "olivedrab": "#6B8E23",
    "orange": "#FFA500",
    "orangered": "#FF4500",
    "orchid": "#DA70D6",
    "palegoldenrod": "#EEE8AA",
    "palegreen": "#98FB98",
    "paleturquoise": "#AFEEEE",
    "palevioletred": "#DB7093",
    "papayawhip": "#FFEFD5",
    "peachpuff": "#FFDAB9",
    "peru": "#CD853F",
    "pink": "#FFC0CB",
    "plum": "#DDA0DD",
    "powderblue": "#B0E0E6",
    "purple": "#800080",
    "rebeccapurple": "#663399",
    "red": "#FF0000",
    "rosybrown": "#BC8F8F",
    "royalblue": "#4169E1",
    "saddlebrown": "#8B4513",
    "salmon": "#FA8072",
    "sandybrown": "#F4A460",
    "seagreen": "#2E8B57",
    "seashell": "#FFF5EE",
    "sienna": "#A0522D",
    "silver": "#C0C0C0",
    "skyblue": "#87CEEB",
    "slateblue": "#6A5ACD",
    "slategray": "#708090",
    "slategrey": "#708090",
    "snow": "#FFFAFA",
    "springgreen": "#00FF7F",
    "steelblue": "#4682B4",
    "tan": "#D2B48C",
    "teal": "#008080",
    "thistle": "#D8BFD8",
    "tomato": "#FF6347",
    "turquoise": "#40E0D0",
    "violet": "#EE82EE",
    "wheat": "#F5DEB3",
    "white": "#FFFFFF",
    "whitesmoke": "#F5F5F5",
    "yellow": "#FFFF00",
    "yellowgreen": "#9ACD32"
};

const colors = Object.keys(w3cNamedColors);
function generateTableRows(s, e, tab) {
    if (colorTableBody.tBodies.length > 0)
        colorTableBody.removeChild(colorTableBody.tBodies[0]);
    colorTableBody.createTBody();
    for (let i = s; i < e; i++) {
        const colorName = colors[tab[i]];
        const hexCode = w3cNamedColors[colorName];
        const row = colorTableBody.tBodies[0].insertRow();
        row.insertCell().textContent = i + 1;
        row.insertCell().textContent = colorName;
        row.insertCell().textContent = hexCode;
        let col = row.insertCell()
        col.classList.add('color-preview');
        col.style.backgroundColor = hexCode;
    }
    entries.textContent = `Showing ${s + 1} to ${e} of ${tab.length} entries`;
}

let i = 0, j = entriesLength, o = colors.length;
let tabl = colors.map((_, i) => i);

btns[0].addEventListener('click', () => {
    generateTableRows(i, j, tabl);
    btns[0].classList.add('y');
    btns[1].classList.remove('y');
    container.style['backgroundColor'] = 'white';
    table.appendChild(search);
    table.appendChild(prev);
    table.appendChild(next);
    table.appendChild(colorTableBody);
    table.appendChild(entries);
    container.replaceChildren(table);
});

text.innerHTML = "Press Space to generate a random color Or";
color.style['color'] = 'white';

btns[1].addEventListener('click', () => {
    btns[1].classList.add('y');
    btns[0].classList.remove('y');
    container.replaceChildren(text);
    container.appendChild(text);
    container.appendChild(change)
    container.appendChild(colorcontainer);
    colorcontainer.appendChild(color);
    colorcontainer.appendChild(colorops);
    container.style['backgroundColor'] = 'black';
});

prev.addEventListener('click', () => {
    if (i == 0) return;
    i = Math.max(0, i - entriesLength);
    if (j == tabl.length && tabl.length%entriesLength != 0) j -= (tabl.length) % entriesLength;
    else j = Math.min(tabl.length, j - entriesLength - j % entriesLength);
    generateTableRows(i, j, tabl);
});

next.addEventListener('click', () => {
    if (j == tabl.length) return;
    i = Math.min(tabl.length, i + entriesLength);
    j = Math.min(tabl.length, j + entriesLength);
    generateTableRows(i, j, tabl);
});

search.addEventListener('keyup', () => {
    let s = search.value;
    tabl = [];
    for (let k = 0; k < colors.length; k++) {
        if (colors[k].toLowerCase().includes(s.toLowerCase()) || w3cNamedColors[colors[k]].toLowerCase().includes(s.toLowerCase()))
            tabl.push(k);
    }
    i = 0;
    j = Math.min(tabl.length, entriesLength);
    generateTableRows(i, j, tabl);
});
