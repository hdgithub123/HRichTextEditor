import React, { useState, useEffect } from 'react';
import { EditorState, Modifier } from 'draft-js';
import styles from './BlockStyle.module.scss';
import { _FONTFAMILY, _FONTSIZES, _COLORS, _NOTCHANGEBLOCK,_MARGINS } from '../../../_constant/_constant';
import getCurrentBlockType from './getCurrentBlock';
import updateBlockStyle from '../../../utilities/updateBlockStyle'
import updateBlockType from '../../../utilities/updateBlockType'


const orderedListType2 = [
  { name: 'Decimal', symbol: '1.' },
  { name: 'DecimalLeadingZero', symbol: '01.' },
  { name: 'LowerAlpha', symbol: 'a.' },
  { name: 'UpperAlpha', symbol: 'A.' },
  { name: 'LowerRoman', symbol: 'i.' },
  { name: 'UpperRoman', symbol: 'I.' },
  { name: 'Georgian', symbol: 'ა.' },
  { name: 'Armenian', symbol: 'Ա.' },
  { name: 'CjkIdeographic', symbol: '一、' },
  { name: 'Hiragana', symbol: 'う、' },
  { name: 'HiraganaIroha', symbol: 'は、' },
  { name: 'Katakana', symbol: 'ウ、' },
  { name: 'KatakanaIroha', symbol: 'ハ、' },
];

const unorderedListType2 = [
  { name: 'Square', symbol: '■' },
  { name: 'Circle', symbol: '○' },
  { name: 'Disc', symbol: '●' },
  { name: 'Plus', symbol: '+' },
  { name: 'Minus', symbol: '-' },
  { name: 'Star', symbol: '*' },
  { name: 'None', symbol: 'none' },
];

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
];

const depthOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



const marginOptions = _MARGINS;
const fontFamilyOptions = _FONTFAMILY;
const fontSizeOptions = _FONTSIZES;
const colorOptions = ['none', ..._COLORS];
const notChangeBlock = _NOTCHANGEBLOCK

const toggleListItem = ({ editorState, blockStyle, blockType }) => {
  let temBlockType = {};
  const currentBlock = getCurrentBlockType({ editorState });
  if (notChangeBlock.includes(currentBlock)) {
    temBlockType = currentBlock;
  } else {
    temBlockType = blockType;
  }
  const newContentStateWithBlockType = updateBlockType({ editorState, blockType: temBlockType })
  const newContentStateWithBlockStyle = updateBlockStyle({ editorState: newContentStateWithBlockType, blockStyle: blockStyle })

  return newContentStateWithBlockStyle
};

const BlockStyle = ({ editorState, setEditorState }) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selection.getStartKey());

  if (!selection || !contentState || !block) {
    return
  }
  // lấy type của block
  const blockType = block.getType();
  const blockStyle = block.getData().get('blockStyle')
  const [selectedBlockStyle, setSelectedBlockStyle] = useState(undefined);
  
  useEffect(() => {
    let blockStyleJS = {};
    try {
      blockStyleJS = blockStyle ? blockStyle.toJS() : {};
    } catch (error) {
      blockStyleJS = blockStyle;
    }
    setSelectedBlockStyle(blockStyleJS);
  }, [blockStyle]);



  const handledOnChange = ({ blockStyle, blockType }) => {
    if (!blockType) {
      return;
    } else {
      const newState = toggleListItem({ editorState, blockStyle, blockType });
      setEditorState(newState);
    }
  };

  return (
    <div>
      <BlockStyleForm
        orderedListType={orderedListType}
        unorderedListType={unorderedListType}
        currentStyle={selectedBlockStyle}
        currentBlockType={blockType}
        onChange={handledOnChange}
      ></BlockStyleForm>
    </div>
  );
};

export default BlockStyle;


const BlockStyleForm = ({ orderedListType, unorderedListType, currentStyle, currentBlockType, onChange }) => {
  const listType = [...orderedListType2, ...unorderedListType2];
  const initialStyle = {
    marginLeft: "none",
    listType: "None",
    fontFamily: "Arial",
    fontSize: "12pt",
    color: "none",
    backgroundColor: "none",
    ...currentStyle,
  }

  const isListBlock = () => {
    if (currentBlockType === 'unordered-list-item' || currentBlockType === 'ordered-list-item') {
      return true
    } else {
      return false
    }
  }


const checkAcvticeBlock = () => {
  if (notChangeBlock.includes(currentBlockType)) {
   return false;
  } else {
    return true;
  }
}



const findBlockType = (listType) => {

  if(selectedIsList === false){
    return currentBlockType;
  }

  let blockType = 'unordered-list-item';
  if (orderedListType.includes(listType)) {
    blockType = 'ordered-list-item';
  } 
  else if (unorderedListType.includes(listType)) {
    blockType = 'unordered-list-item';
  } else {
    // blockType = currentBlockType;
  }

  return blockType;
};

  const [selectedType, setSelectedType] = useState(initialStyle);
  const [selectedIsList, setSelectedIsList] = useState(isListBlock());
  const [blockType, setBlockType] = useState(findBlockType(initialStyle.listType));
  const [selectedListType, setSelectedListType] = useState(initialStyle.listType);

  useEffect(() => {
    if (!currentStyle) {
      setSelectedType(initialStyle);
      setSelectedListType('None');
    } else {
      setSelectedType(currentStyle);
      setSelectedListType(currentStyle.listType);
    }
  }, [currentStyle]);


  useEffect(() => {
    setBlockType(findBlockType())
  }, [findBlockType(),selectedIsList]);


  const handleMarginLeftChange = (e) => {
    if (!blockType) {
      return;
    }
    const blockStyle = {
      ...selectedType,
      marginLeft: e.target.value //Number(e.target.value)
    }
    setSelectedType(blockStyle)
    onChange({ blockStyle, blockType });
  };

  const handleListTypeChange = (e) => {
    if (!blockType) {
      return;
    }
    const blockStyle = {
      ...selectedType,
      listType: e.target.value
    }
    const blockType2 = findBlockType(e.target.value);
    onChange({ blockStyle, blockType: blockType2 });
    setSelectedType(blockStyle)
  
  };

  const handleFontFamilyChange = (e) => {
    if (!blockType) {
      return;
    }
    const blockStyle = {
      ...selectedType,
      fontFamily: e.target.value
    }
    setSelectedType(blockStyle)
    onChange({ blockStyle, blockType });
  };

  const handleFontSizeChange = (e) => {
    if (!blockType) {
      return;
    }
    const blockStyle = {
      ...selectedType,
      fontSize: e.target.value
    }
    setSelectedType(blockStyle)
    onChange({ blockStyle, blockType });
  };

  const handleFontColorChange = (e) => {
    if (!blockType) {
      return;
    }
    const blockStyle = {
      ...selectedType,
      color: e.target.value
    }
    setSelectedType(blockStyle)
    onChange({ blockStyle, blockType });
  };

  const handleFontBackgroundColorChange = (e) => {
    if (!blockType) {
      return;
    }
    const blockStyle = {
      ...selectedType,
      backgroundColor: e.target.value
    }
    setSelectedType(blockStyle)
    onChange({ blockStyle, blockType });
  };

  const handleIsListChange = (e) => {
    if (!blockType) {
      return;
    }

    
    if (e.target.checked) {
      const blockStyle = {
        ...selectedType,
      }
      const blockType = findBlockType();
      setSelectedType(blockStyle)
      onChange({ blockStyle, blockType });
    } else {
    
    }
    setSelectedIsList(e.target.checked)
  }

  return (
    <div className={styles.container}>
      <table>
        <tbody>
          <tr>
            <td>Margin Left:</td>
            <td>
              <select id="marginLeftSelect" value={selectedType.marginLeft} onChange={handleMarginLeftChange} style={{ borderRadius: '3px' }}>
                {marginOptions.map((margin,index) => (
                  <option key={index} value={margin}>
                    {margin}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Item Type:</td>
            <td>
              <select id="listTypeSelect" value={selectedListType} disabled={selectedIsList && checkAcvticeBlock()? !checkAcvticeBlock():true} onChange={handleListTypeChange} style={{ borderRadius: '3px' }}>
                {listType.map((type, index) => (
                  <option key={index} value={type.name} disabled={!selectedIsList}>
                    {type.symbol}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Font Family:</td>
            <td>
              <select id="fontFamilySelect" value={selectedType.fontFamily} onChange={handleFontFamilyChange} style={{ fontFamily: selectedType.fontFamily, borderRadius: '3px' }}>
                {fontFamilyOptions.map((font, index) => (
                  <option key={index} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Font Size: </td>
            <td>
              <select id="fontSizeSelect" value={selectedType.fontSize} onChange={handleFontSizeChange} style={{ borderRadius: '3px' }}>
                {fontSizeOptions.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Font Color:</td>
            <td>
              <select
                id="fontColor"
                value={selectedType.color}
                onChange={handleFontColorChange}
                style={{
                  backgroundColor: selectedType.color !== 'none' ? selectedType.color : 'transparent',
                  borderRadius: '3px',
                  color: selectedType.color === 'black' ? 'white' : 'black'
                }}
              >
                {colorOptions.map((color, index) => (
                  <option key={index} value={color} className={styles.colorSwatch} style={{ backgroundColor: color, color: color === 'black' ? 'white' : 'black' }}>
                    {color}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Background:</td>
            <td>
              <select
                id="backgroundColor"
                value={selectedType.backgroundColor}
                onChange={handleFontBackgroundColorChange}
                style={{
                  backgroundColor: selectedType.backgroundColor !== 'none' ? selectedType.backgroundColor : 'transparent',
                  borderRadius: '3px',
                  color: selectedType.backgroundColor === 'black' ? 'white' : 'black'
                }}
              >
                {colorOptions.map((color, index) => (
                  <option key={index} value={color} className={styles.colorSwatch} style={{ backgroundColor: color, color: color === 'black' ? 'white' : 'inherit' }}>
                    {color}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td>List Type:</td>
            <td>
              <input
                type="checkbox"
                checked={selectedIsList}
                onChange={handleIsListChange}
                disabled={selectedIsList? selectedIsList: !checkAcvticeBlock()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
