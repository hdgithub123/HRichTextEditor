import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import styles from './TextAlign.module.scss';
import leftIcon from './textalignLeft.svg'
import rightIcon from './textalignRight.svg'
import centerIcon from './textalignCenter.svg'
import justifyIcon from './textalignJustify.svg'




// Hàm cập nhật thuộc tính dữ liệu tùy chỉnh `textAlign` của block
const toggleTextAlign = (editorState, alignment) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selection.getStartKey());

  // Cập nhật dữ liệu tùy chỉnh của block
  const newBlockData = block.getData().set('textAlign', alignment);
  const newContentState = Modifier.setBlockData(contentState, selection, newBlockData);

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

// Component TextAlign
const TextAlign = ({ editorState, setEditorState }) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const blockKey = selection.getStartKey();
  const currentBlock = currentContent.getBlockForKey(blockKey);
  // lay ra data textAlign của Block
  const blockTextAlign = currentBlock.getData().get('textAlign');

  const handleTextAlign = (alignment) => {
    const newState = toggleTextAlign(editorState, alignment);
    setEditorState(newState);
  };

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
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
