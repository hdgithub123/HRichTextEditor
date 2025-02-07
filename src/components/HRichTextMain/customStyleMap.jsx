import { DefaultDraftInlineStyle } from 'draft-js';
import { _FONTFAMILY, _FONTSIZES, _COLORS } from '../_constant/_constant';

export const COLORS = _COLORS? _COLORS:[
  'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white'
];

export const FONTS = _FONTFAMILY? _FONTFAMILY: [
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
  ];

export const FONT_SIZES = _FONTSIZES? _FONTSIZES: [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
];


const customStyleMap = (() => {
  const styleMap = { ...DefaultDraftInlineStyle };

  COLORS.forEach(color => {
    styleMap[`color.${color}`] = { color: color };
  });

  COLORS.forEach(color => {
    styleMap[`backgroundColor.${color}`] = { backgroundColor: color };
  });

  FONTS.forEach(font => {
    styleMap[`fontFamily.${font}`] = { fontFamily: font };
  });

  FONT_SIZES.forEach(size => {
    styleMap[`fontSize.${size}`] = { fontSize: `${size}pt` };
  });

  // Bổ sung các kiểu tùy chỉnh khác
  styleMap.UPPERCASE = {
    textTransform: "uppercase",
  };

  styleMap.LOWERCASE = {
    textTransform: "lowercase",
  };



  styleMap.SUPERSCRIPT = {
    verticalAlign: "super",
    fontSize: "80%",
  };

  styleMap.SUBSCRIPT = {
    verticalAlign: "sub",
    fontSize: "80%",
  };

  return styleMap;
})();

export default customStyleMap;
