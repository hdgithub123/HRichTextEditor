import React,{useState,useEffect} from 'react';
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

    // kiểm tra xem có blockStyle không
    if (!block.getData().get('blockStyle')) {
      setActive(styles.unactive);
    } else {
      setActive(styles.active);
    }
  }, [editorState]);
  
  const handleClick = (e) => {
    e.preventDefault();
   const newContent = deleteBlockStyle({editorState});
   console.log(newContent)
    setEditorState(newContent);
  };

  return (
    <button className={styles.button} onMouseDown={handleClick}>
          <img src={ImageIcon} alt='Clear Style' title='Clear Style' className={`${styles.img} ${active}`}/>
    </button>
  
  );
};


export default DeleteBlockStyle
