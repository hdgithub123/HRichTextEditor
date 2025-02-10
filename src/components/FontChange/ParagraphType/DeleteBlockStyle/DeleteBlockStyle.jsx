import React, { useState, useEffect } from 'react';
import ImageIcon from './clearFormatting.svg'
import deleteBlockStyle from '../../../utilities/deleteBlockStyle';
import styles from './DeleteBlockStyle.module.scss';


const DeleteBlockStyle = ({ editorState, setEditorState }) => {
  const [active, setActive] = useState(styles.unactive);
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    try {
      // kiểm tra xem có blockStyle không
      if (!block.getData().get('blockStyle')) {
        setActive(styles.unactive);
      } else {
        setActive(styles.active);
      }
    } catch (error) {
      setActive(styles.unactive);
    }
  }, [editorState]);

  const handleClick = (e) => {
    e.preventDefault();
    const newContent = deleteBlockStyle({ editorState });
    setEditorState(newContent);
  };

  return (
    <button className={styles.button} onMouseDown={handleClick}>
      <img src={ImageIcon} alt='Clear Block Style' title='Clear Block Style' className={`${styles.img} ${active}`} />
    </button>

  );
};


export default DeleteBlockStyle
