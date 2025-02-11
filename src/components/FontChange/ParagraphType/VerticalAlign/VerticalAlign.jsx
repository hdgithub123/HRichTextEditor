import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import updateBlockStyle from '../../../utilities/updateBlockStyle'
import styles from './VerticalAlign.module.scss';
import topIcon from './verticalAlignTop.svg'
import middleIcon from './verticAllignMiddle.svg'
import bottomIcon from './verticalAlignBottom.svg'


// Hàm cập nhật thuộc tính dữ liệu tùy chỉnh `textAlign` của block
const toggleVerticalAlign = (editorState, alignment) => {
  const blockStyle = {verticalAlign:alignment}
  const newContentState = updateBlockStyle({editorState,blockStyle})
  return newContentState;
};

// Component TextAlign
const VerticalAlign = ({ editorState, setEditorState }) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const blockKey = selection.getStartKey();
  const currentBlock = currentContent.getBlockForKey(blockKey);
  // lay ra data textAlign của Block
  let blockVerticalAlign = ''
  try {
    blockVerticalAlign = currentBlock.getData().getIn(['blockStyle', 'verticalAlign']);
  } catch (error) {
    blockVerticalAlign = ''
  }




  const handleVerticalAlign = (alignment) => {
    const newState = toggleVerticalAlign(editorState, alignment);
    setEditorState(newState);
  };

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <button className={styles.button} title='Align top' onClick={() => handleVerticalAlign('top')}>
        <img src={topIcon} alt="Top" className={`${styles.img} ${blockVerticalAlign === 'top' ? styles.active : styles.unactive}`} />
      </button>
      <button className={styles.button} title='Align middle' onClick={() => handleVerticalAlign('middle')}>
        <img src={middleIcon} alt="middle" className={`${styles.img} ${blockVerticalAlign === 'middle' ? styles.active : styles.unactive}`} />
      </button>
      <button className={styles.button} title='Align bottom' onClick={() => handleVerticalAlign('bottom')}>
        <img src={bottomIcon} alt="bottom" className={`${styles.img} ${blockVerticalAlign === 'bottom' ? styles.active : styles.unactive}`} />
      </button>
    </div>
  );
};

export default VerticalAlign;
