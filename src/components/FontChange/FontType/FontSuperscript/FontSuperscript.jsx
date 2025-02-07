import React, { useEffect,useState } from 'react';
import styles from './FontSuperscript.module.scss';
import superScriptIcon from './superscript.svg'


const FontSuperscript = ({ currentStyle, onClick }) => {
  const [active, setActive] = useState(styles.unactive);
  
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  useEffect(() => {
    if(currentStyle) {
      setActive(styles.active)
    } else {
      setActive(styles.unactive)
    }
  }, [currentStyle]);

  return (
    <button className={styles.button} onMouseDown={handleClick}>
      <img src={superScriptIcon} alt="Bold" className={`${styles.img} ${active}`}/>
    </button>
  );
};

export default FontSuperscript;
