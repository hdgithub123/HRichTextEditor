import React, { useEffect, useState, useRef } from 'react';
import ListType from "./ListType";
import getCurrentBlock from './getCurrentBlock';
import useOnClickOutside from '../../../utilities/useOnClickOutside';
import styles from './ListTypeView.module.scss';
import listIcon from './unorderedList.svg'


const ListTypeView = ({ editorState, setEditorState }) => {
  const [active, setActive] = useState(styles.unactive);
  const [show, setShow] = useState(false);
  const ref = useRef();
  const currentBlock = getCurrentBlock({ editorState });
  
    useEffect(() => {
      if(currentBlock === "unordered-list-item" || currentBlock === "ordered-list-item" ) {
        setActive(styles.active)
      } else {
        setActive(styles.unactive)
      }
    }, [currentBlock]);

  useOnClickOutside(ref, () => {
    setShow(false);
  });

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button className={styles.button} onMouseDown={handleClick}>
        <img src={listIcon} alt="List" title="List Item" className={`${styles.img} ${active}`}/>
      </button>
      {show && (
        <div className={styles.listTypeContainer}>
          <ListType editorState={editorState} setEditorState={setEditorState} />
        </div>
      )}
    </div>
  );
};

export default ListTypeView;