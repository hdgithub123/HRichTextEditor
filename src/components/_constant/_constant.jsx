const _FONTFAMILY = [
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Palatino',
    'Garamond',
    'Comic Sans MS',
    'Trebuchet MS',
    'Arial Black',
    'Impact',
]


const _FONTSIZES = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
];


const _COMMONCOLOURS = {
    white: "#FFFFFF",
    black: "#000000",
    red: "#FF0000",
    crimson: "#DC143C",
    coral: "#FF7F50",
    orange: "#FFA500",
    salmon: "#FA8072",
    gold: "#FFD700",
    yellow: "#FFFF00",
    khaki: "#F0E68C",
    green: "#00FF00",
    mintGreen: "#98FF98",
    lightGreen: "#90EE90",
    darkGreen: "#006400",
    teal: "#008080",
    cyan: "#00FFFF",
    lightBlue: "#ADD8E6",
    blue: "#0000FF",
    navy: "#000080",
    darkBlue: "#00008B",
    magenta: "#FF00FF",
    pink: "#FFC0CB",
    purple: "#800080",
    plum: "#DDA0DD",
    lavender: "#E6E6FA",
    brown: "#A52A2A",
    chocolate: "#D2691E",
    gray: "#808080",
    darkGray: "#A9A9A9",
    lightGray: "#D3D3D3",
    silver: "#C0C0C0",
    beige: "#F5F5DC",
    olive: "#808000",
};









const _LINEHEIGHT = [
    'normal',
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
]


const _MARGINS = [
    '-100px',
    '0px',
    '10px',
    '20px',
    '30px',
    '40px',
    '50px',
    '60px',
    '70px',
    '80px',
    '90px',
    '100px',
    '110px',
    '120px',
    '130px',
    '140px',
    '150px',
    '160px',
    '170px',
    '180px',
    '190px',
    '200px',
    '210px',
    '220px',
    '230px',
    '240px',
    '250px',
    '260px',
    '270px',
    '280px',
    '290px',
    '300px',

]


const _NOTCHANGEBLOCK = [
    'tableStructure',
    'cellTable',
    // 'blockquote',
]

const _ALLBOCK = [
    'tableStructure',
    'cellTable',
    'MAIN_BLOCK',
    'VIDEO_BLOCK',
    'IMAGE_BLOCK',
    'unstyled',
    'ordered-list-item',
    'unordered-list-item',
    'paragraph',
    'blockquote',
    'header-one',
    'header-two',
    'header-three',
    'header-four',
    'header-five',
    'header-six',

]

const _ALLENTITYMAP = [
    'IMAGE_INLINE',
    'LINK',
]

const defaultEditorStyle = {
    width: '210mm',
    height: 'auto',
    marginLeft: '0mm',
    marginTop: '0mm',
    marginRight: '0mm',
    marginBottom: '0mm',
    paddingLeft: '30mm',
    paddingTop: '20mm',
    paddingRight: '15mm',
    paddingBottom: '20mm',
}


const defaultPageSetup = {
    pageHeight: '297mm',
    isRepeatThead: true,
    pageNumber: {
        position: '',
        format: '',
        style: {},
    },
};



const _UNIT = [
    'mm',
    'px',
    'pt',
    'cm',
    'rem',
    'em',
]




export {
    _FONTFAMILY,
    _FONTSIZES,
    _COMMONCOLOURS,
    _LINEHEIGHT,
    _NOTCHANGEBLOCK,
    _MARGINS,
    _UNIT,
    defaultEditorStyle,
    defaultPageSetup,
}