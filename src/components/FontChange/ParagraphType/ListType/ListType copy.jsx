import React, { useState, useEffect } from 'react';
import { EditorState, Modifier } from 'draft-js';
import styles from './ListType.module.scss';
import { _FONTFAMILY,_FONTSIZES,_COLORS,} from '../../_constant/_constant';


const orderedListType = [
  'Decimal',
  'LowerAlpha',
  'UpperAlpha',
  'LowerRoman',
  'UpperRoman',
  'Georgian',
  'Armenian',
  'CjkIdeographic',
  'Hiragana',
  'HiraganaIroha',
  'Katakana',
  'KatakanaIroha',
  'DecimalLeadingZero',
];

const unorderedListType = [
  'Square',
  'Circle',
  'Disc',
  'None',
  'Plus',
  'Minus',
  'Star',
]

const depthOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const fontFamilyOptions = _FONTFAMILY
const fontSizeOptions =_FONTSIZES
const colorOptions = ['none',..._COLORS];


const toggleListItem = ({editorState, depth, listType,fontFamily,fontSize,fontColor,backgroundColor, blockType}) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selection.getStartKey());
  let temBlockType = '';

  if (blockType === 'ordered-list-item' || blockType === 'unordered-list-item') {
    temBlockType = blockType
  } else {
    return;
  }

  // Cập nhật blockType của block
  const newContentStateWithBlockType = Modifier.setBlockType(contentState, selection, temBlockType);

  // Cập nhật dữ liệu tùy chỉnh của block với listType và depth
  const newBlockData = newContentStateWithBlockType.getBlockForKey(block.getKey()).getData().merge({
    listType,
    fontFamily,
    fontSize,
    fontColor,
    backgroundColor,
  });
  
  
  const newBlockWithDepth = newContentStateWithBlockType.getBlockForKey(block.getKey()).merge({
    depth: depth,
    data: newBlockData,
  });

  const blockMap = newContentStateWithBlockType.getBlockMap().set(block.getKey(), newBlockWithDepth);
  const newContentState = newContentStateWithBlockType.merge({
    blockMap: blockMap,
  });

  return EditorState.push(editorState, newContentState, 'adjust-depth');
};



const ListType = ({ editorState, setEditorState}) => {
  
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const depth = block.getDepth();
    const listTypeTemp = block.getData().get('listType');
    const fontFamily = block.getData().get('fontFamily');
    const fontSize = block.getData().get('fontSize');
    const fontColor = block.getData().get('fontColor');
    const backgroundColor = block.getData().get('backgroundColor');
    const [selectedDepth, setSelectedDepth] = useState('0');
    const [selectedListType, setSelectedListType] = useState('None');
    const [selectedFontFamily, setSelectedFontFamily] = useState('Arial');
    const [selectedFontSize, setSelectedFontSize] = useState('12pt');
    const [selectedFontColor, setSelectedFontColor] = useState('black');
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('white');


  useEffect(() => {
    setSelectedDepth(depth);
    setSelectedListType(listTypeTemp);
    setSelectedFontFamily(fontFamily)
    setSelectedFontSize(fontSize)
    setSelectedFontColor(fontColor)
    setSelectedBackgroundColor(backgroundColor)
  }, [depth, listTypeTemp, fontFamily, fontSize,fontColor,backgroundColor]);

  const handledOnChange = ({ depth, listType,fontFamily, fontSize,fontColor,backgroundColor, blockListType }) => {

    if (!blockListType || !listType) {
      return;
    } else {
      const newState = toggleListItem({editorState, depth, listType, fontFamily, fontSize,fontColor,backgroundColor, blockType:blockListType});
      setEditorState(newState)
    }
  }

  return (
    <div> 
      <ListTypeForm
        orderedListType={orderedListType}
        unorderedListType={unorderedListType}
        currentDepth={selectedDepth}
        currentListType={selectedListType}
        currentFontFamily={selectedFontFamily}
        currentFontSize={selectedFontSize}
        currentFontColor={selectedFontColor}
        currentBackgroundColor={selectedBackgroundColor}
        onChange={handledOnChange}
      ></ListTypeForm>
    </div>
  );
};

export default ListType;


const ListTypeForm = ({ orderedListType, unorderedListType, currentDepth, currentListType, currentFontFamily, currentFontSize, currentFontColor, currentBackgroundColor, onChange}) => {
  const listType = [...orderedListType, ...unorderedListType];
  const [selectedDepth, setSelectedDepth] = useState(0);
  const [selectedListType, setSelectedListType] = useState("None");
  const [selectedFontFamily, setSelectedFontFamily] = useState('Arial');
  const [selectedFontSize, setSelectedFontSize] = useState('12pt');
  const [selectedFontColor, setSelectedFontColor] = useState('none');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('none');


  const findBlockType = () => {
    let blockType = 'unordered-list-item';
    if (orderedListType.includes(selectedListType)) {
      blockType = 'ordered-list-item';
    } else if (unorderedListType.includes(selectedListType)) {
      blockType = 'unordered-list-item';
    } else {
      blockType = null;
    }
    return blockType;
  };

  useEffect(() => {
    if (!currentDepth) {
      setSelectedDepth(0);
    } else {
      setSelectedDepth(currentDepth);
    }
    
    if (!currentListType) {
      setSelectedListType('None');
    } else { 
      setSelectedListType(currentListType);
    }
    
    if (!currentFontFamily) {
      setSelectedFontFamily('Arial');
    } else {
      setSelectedFontFamily(currentFontFamily);
    }

    if (!currentFontSize) {
      setSelectedFontSize('12pt');
    } else {
      setSelectedFontSize(currentFontSize);
    }

    if (!currentFontColor) {
      setSelectedFontColor('none');
    } else {
      setSelectedFontColor(currentFontColor);
    }

    if (!currentBackgroundColor) {
      setSelectedBackgroundColor('none');
    } else {
      setSelectedBackgroundColor(currentBackgroundColor);
    }

  }, [currentDepth, currentListType, currentFontFamily, currentFontSize, currentFontColor, currentBackgroundColor]);

  const blockType = findBlockType();

 const handleDepthChange = (e) => {
    if(!blockType) {
      return;
    }
    setSelectedDepth(Number(e.target.value))
    onChange({ depth: Number(e.target.value), listType: selectedListType, blockListType:blockType, fontFamily: selectedFontFamily, fontSize: selectedFontSize, fontColor: selectedFontColor, backgroundColor: selectedBackgroundColor });
 };

 const handleListTypeChange = (e) => {
  const listType = e.target.value;
  setSelectedListType(e.target.value)
  onChange({ depth: selectedDepth, listType: listType, blockListType:blockType, fontFamily: selectedFontFamily, fontSize: selectedFontSize, fontColor: selectedFontColor, backgroundColor: selectedBackgroundColor });
};

const handleFontFamilyChange = (e) => {
  setSelectedFontFamily(e.target.value)
  onChange({ depth: selectedDepth, listType: selectedListType, blockListType:blockType, fontFamily: e.target.value, fontSize: selectedFontSize, fontColor: selectedFontColor, backgroundColor: selectedBackgroundColor });
}

const handleFontSizeChange = (e) => {
  setSelectedFontSize(e.target.value)
  onChange({ depth: selectedDepth, listType: selectedListType, blockListType:blockType, fontFamily: selectedFontFamily, fontSize: e.target.value, fontColor: selectedFontColor, backgroundColor: selectedBackgroundColor });
}

const handleFontColorChange = (e) => {
  setSelectedFontColor(e.target.value)
  onChange({ depth: selectedDepth, listType: selectedListType, blockListType:blockType, fontFamily: selectedFontFamily, fontSize: selectedFontSize, fontColor: e.target.value, backgroundColor: selectedBackgroundColor });
}

const handleFontBackgroundColorChange = (e) => {
  setSelectedBackgroundColor(e.target.value)
  onChange({ depth: selectedDepth, listType: selectedListType, blockListType:blockType, fontFamily: selectedFontFamily, fontSize: selectedFontSize, fontColor: selectedFontColor, backgroundColor: e.target.value });
}

  return (
    <div>
      {/* Tạo nút chọn deep */}
      <div>
        <label>Level: </label>
        <select
          id="depthSelect"
          value={selectedDepth}
          onChange={handleDepthChange}
          style={{ borderRadius: '6px' }}
        >
          {depthOptions.map((depth) => (
            <option key={depth} value={depth}>
              {depth}
            </option>
          ))}
        </select>
      </div>
      {/* Tạo nút chọn listType */}
      <div>
        <label>Item Type: </label>
        <select
          id="listTypeSelect"
          value={selectedListType}
          onChange={handleListTypeChange}
          style={{ borderRadius: '6px' }}
        >
          {listType.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {/* Tạo nút chọn fontFamily */}
      <div>
        <label>Font Family: </label>
        <select
          id="fontFamilySelect"
          value={selectedFontFamily}
          onChange={handleFontFamilyChange}
          style={{ fontFamily: selectedFontFamily, borderRadius: '6px' }}
        >
          {fontFamilyOptions.map((font, index) => (
            <option key={index} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>
      {/* Tạo nút chọn fontSize */}
      <div>
        <label>Font Size: </label>
        <select
          id="fontSizeSelect"
          value={selectedFontSize}
          onChange={handleFontSizeChange}
          style={{ borderRadius: '6px' }}
        >
          {fontSizeOptions.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
        {/* Tạo nút chọn fontColor */}
        <div>
        <label>Font Color: </label>
        <select
          id="fontColor"
          value={selectedFontColor}
          onChange={handleFontColorChange}
          style={{ 
            backgroundColor: selectedFontColor !== 'none'? selectedFontColor: 'transparent',
            borderRadius: '6px',
           }}
        >
          {colorOptions.map((color, index) => (
            <option key={index} value={color} className={styles.colorSwatch} style={{ backgroundColor: color, color: color === 'black'? 'white': 'inherit' }}>
              {color}
            </option>
          ))}
        </select>
      </div>

        {/* Tạo nút chọn backgroundColor */}
        <div>
        <label>Background: </label>
        <select
          id="backgroundColor"
          value={selectedBackgroundColor}
          onChange={handleFontBackgroundColorChange}
          style={{ 
            backgroundColor: selectedBackgroundColor !== 'none'? selectedBackgroundColor: 'transparent',
            
            borderRadius: '6px' ,
          }}
        >
          {colorOptions.map((color, index) => (
            <option key={index} value={color} className={styles.colorSwatch} style={{ backgroundColor: color, color: color === 'black'? 'white': 'inherit' }}>
              {color}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};