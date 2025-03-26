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



const presetColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#00FFFF', '#FFA500', '#A52A2A', '#800080', '#008000',
    '#000080', '#808000', '#800000', '#008080', '#000000',
    '#FFFFFF', '#C0C0C0', '#808080', '#FFD700', '#FFC0CB'
  ]

  
const _COLORS = [
    // 'none',
    'white',
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'black',
    ...presetColors,
];





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
    _COLORS,
    _LINEHEIGHT,
    _NOTCHANGEBLOCK,
    _MARGINS,
    _UNIT,
    defaultEditorStyle,
}