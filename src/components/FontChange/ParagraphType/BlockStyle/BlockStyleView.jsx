import React, { useEffect, useState, useRef } from 'react';
import BlockStyle from "./BlockStyle";
import getCurrentBlock from './getCurrentBlock';
import useOnClickOutside from '../../../utilities/useOnClickOutside';
import styles from './BlockStyleView.module.scss';
import listIcon from './styleBlock.svg'
import { _NOTCHANGEBLOCK } from '../../../_constant/_constant';

const notChangeBlock = _NOTCHANGEBLOCK

const BlockStyleView = ({ editorState, setEditorState }) => {
  const [active, setActive] = useState(styles.unactive);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(true);
  const ref = useRef();
  const currentBlock = getCurrentBlock({ editorState });


  useEffect(() => {
    // if (notChangeBlock.includes(currentBlock)) {
    //   setView(false)
    // } else{
    //   setView(true)
    // }
    // if (currentBlock === "unordered-list-item" || currentBlock === "ordered-list-item") {
    //   setActive(styles.active)
    // } else {
    //   setActive(styles.unactive)
    // }
    if (currentBlock) {
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
    <>
      {view && (
        <div ref={ref} style={{ position: 'relative', alignContent: 'center' }}>
          <button className={styles.button} onMouseDown={handleClick}>
            <img src={listIcon} alt="Style Block" title="Style Block" className={`${styles.img} ${active}`} />
          </button>
          {show && (
            <div className={styles.listTypeContainer}>
              <BlockStyle editorState={editorState} setEditorState={setEditorState} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BlockStyleView;