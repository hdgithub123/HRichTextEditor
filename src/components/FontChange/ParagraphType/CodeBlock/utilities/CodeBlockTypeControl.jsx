import React, { useEffect,useState } from 'react';
import styles from './CodeBlockTypeControl.module.scss';
import { _NOTCHANGEBLOCK } from '../../../../../components/_constant/_constant';

const notChangeBlock = _NOTCHANGEBLOCK

const CodeBlockTypeControl = ({ currentCodeBlock,ImageIcon,altImage, onClick }) => {
  const [active, setActive] = useState(styles.unactive);
  const [disable, setDisable] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  
  useEffect(() => {

    if (notChangeBlock.includes(currentCodeBlock)) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [currentCodeBlock]);


  useEffect(() => {
    if(currentCodeBlock === altImage) {
      setActive(styles.active)
    } else {
      setActive(styles.unactive)
    }
  }, [currentCodeBlock]);

  return (

    <button disabled={disable} className={styles.button} onMouseDown={handleClick}>
          <img src={ImageIcon} alt={altImage} title={altImage} className={`${styles.img} ${active}`}/>
    </button>
  
  );
};


export default CodeBlockTypeControl