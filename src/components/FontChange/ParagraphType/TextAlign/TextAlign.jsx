import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import updateBlockStyle from '../../../utilities/updateBlockStyle'
import styles from './TextAlign.module.scss';
import leftIcon from './textalignLeft.svg'
import rightIcon from './textalignRight.svg'
import centerIcon from './textalignCenter.svg'
import justifyIcon from './textalignJustify.svg'




// Hàm cập nhật thuộc tính dữ liệu tùy chỉnh `textAlign` của block
const toggleTextAlign = (editorState, alignment) => {
  const blockStyle = {textAlign:alignment}
  const newContentState = updateBlockStyle({editorState,blockStyle})
  return newContentState;
};

// Component TextAlign
const TextAlign = ({ editorState, setEditorState }) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const blockKey = selection.getStartKey();
  const currentBlock = currentContent.getBlockForKey(blockKey);
  // lay ra data textAlign của Block
  let blockTextAlign = ''
  try {
    blockTextAlign = currentBlock.getData().getIn(['blockStyle', 'textAlign']);
  } catch (error) {
    blockTextAlign = ''
  }




  const handleTextAlign = (alignment) => {
    const newState = toggleTextAlign(editorState, alignment);
    setEditorState(newState);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} title='Align Left' onClick={() => handleTextAlign('left')}>
        <img src={leftIcon} alt="Left" className={`${styles.img} ${blockTextAlign === 'left' ? styles.active : styles.unactive}`} />
      </button>
      <button className={styles.button} title='Align Center' onClick={() => handleTextAlign('center')}>
        <img src={centerIcon} alt="Center" className={`${styles.img} ${blockTextAlign === 'center' ? styles.active : styles.unactive}`} />
      </button>
      <button className={styles.button} title='Align Right' onClick={() => handleTextAlign('right')}>
        <img src={rightIcon} alt="Right" className={`${styles.img} ${blockTextAlign === 'right' ? styles.active : styles.unactive}`} />
      </button>
      <button className={styles.button} title='Align Justify' onClick={() => handleTextAlign('justify')}>
        <img src={justifyIcon} alt="Justify" className={`${styles.img} ${blockTextAlign === 'justify' ? styles.active : styles.unactive}`} />
      </button>
    </div>
  );
};

export default TextAlign;
