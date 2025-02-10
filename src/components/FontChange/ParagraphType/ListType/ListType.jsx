import React, { useState, useEffect } from 'react';
import { EditorState, Modifier } from 'draft-js';
import styles from './ListType.module.scss';
import { _FONTFAMILY, _FONTSIZES, _COLORS, _NOTCHANGEBLOCK,_MARGINS } from '../../../../components/_constant/_constant';
import getCurrentBlock from './getCurrentBlock';
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
  console.log("currentStyle toggle", blockStyle)
  const currentBlock = getCurrentBlock({ editorState });
  if (notChangeBlock.includes(currentBlock)) {
    return editorState;
  }

  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selection.getStartKey());
  let temBlockType = '';

  // Cập nhật blockType của block
  const newContentStateWithBlockType = updateBlockType({ editorState, blockType: blockType })
  const newContentStateWithBlockStyle = updateBlockStyle({ editorState: newContentStateWithBlockType, blockStyle: blockStyle })

  return newContentStateWithBlockStyle
};

const ListType = ({ editorState, setEditorState }) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selection.getStartKey());

  if (!selection || !contentState || !block) {
    return
  }
  // lấy type của block
  const blockType = block.getType();
  const blockStyle = block.getData().get('blockStyle')
  const [selectedBlockStyle, setSelectedselectedBlockStyle] = useState(undefined);

  useEffect(() => {
    const blockStyleJS = blockStyle ? blockStyle.toJS() : {};
    setSelectedselectedBlockStyle(blockStyleJS);
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
      <ListTypeForm
        orderedListType={orderedListType}
        unorderedListType={unorderedListType}
        currentStyle={selectedBlockStyle}
        currentBlockType={blockType}
        onChange={handledOnChange}
      ></ListTypeForm>
    </div>
  );
};

export default ListType;


const ListTypeForm = ({ orderedListType, unorderedListType, currentStyle, currentBlockType, onChange }) => {
  const listType = [...orderedListType2, ...unorderedListType2];
  const initialStyle = {
    marginLeft: "none",
    listType: "None",
    fontFamily: "Arial",
    fontSize: "12pt",
    fontColor: "none",
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

  // const findListTypeSymbol = (currentStyle) => {
  //   try {
  //     if (currentStyle.listType) {
  //       // tìm kiếm tại listType với name = currentStyle.listType và trả về symbol
  //       const foundType = listType.find(type => type.name === currentStyle.listType)
  //       console.log("foundType.symbol", foundType.symbol)
  //       return foundType.symbol
  //     } else {
  //       return 'none'
  //     }
  //   } catch (error) {
  //     return 'none'
  //   }
  // }


  // let blockType = '';
  const findBlockType = () => {
    let blockType = 'ordered-list-item';
    if (orderedListType.includes(selectedType.listType)) {
      blockType = 'ordered-list-item';
    } else if (unorderedListType.includes(selectedType.listType)) {
      blockType = 'unordered-list-item';
    } else {
      // blockType = currentBlockType;
    }
    return blockType;
  };



  const [selectedType, setSelectedType] = useState(initialStyle);
  const [selectedIsList, setSelectedIsList] = useState(isListBlock());
  const [blockType, setBlockType] = useState(findBlockType());
  const [selectedListType, setSelectedListType] = useState(initialStyle.listType);

  console.log("initialStyle", initialStyle)
  useEffect(() => {
    if (selectedIsList === true) {
      const newblockType = findBlockType();
      setBlockType(newblockType)
    } else {
      setBlockType(currentBlockType)
    }

  }, [selectedType, selectedIsList]);


  useEffect(() => {
    if (!currentStyle) {
      setSelectedType(initialStyle);
      setSelectedListType('None');
    } else {
      setSelectedType(currentStyle);
      setSelectedListType(currentStyle.listType);
    }
  }, [currentStyle]);


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
    setSelectedType(blockStyle)
    console.log("selectedListType", selectedListType)
    // setSelectedListType(e.target.value)
    onChange({ blockStyle, blockType });
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
      fontColor: e.target.value
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
      <table border="1">
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
              <select id="listTypeSelect" value={selectedListType} onChange={handleListTypeChange} style={{ borderRadius: '3px' }}>
                {listType.map((type, index) => (
                  <option key={index} value={type.name}>
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
                value={selectedType.fontColor}
                onChange={handleFontColorChange}
                style={{
                  backgroundColor: selectedType.fontColor !== 'none' ? selectedType.fontColor : 'transparent',
                  borderRadius: '3px',
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
            <td>Background:</td>
            <td>
              <select
                id="backgroundColor"
                value={selectedType.backgroundColor}
                onChange={handleFontBackgroundColorChange}
                style={{
                  backgroundColor: selectedType.backgroundColor !== 'none' ? selectedType.backgroundColor : 'transparent',
                  borderRadius: '3px',
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
              {/* tạo nút checkbox cho  selectedIsList */}
              <input
                type="checkbox"
                checked={selectedIsList}
                onChange={handleIsListChange}
                disabled={selectedIsList}
              />
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};
