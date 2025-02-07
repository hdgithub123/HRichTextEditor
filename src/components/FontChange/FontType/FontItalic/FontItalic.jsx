import React, { useEffect,useState } from 'react';
import styles from './FontItalic.module.scss';
import italicIcon from './italic.svg'

const FontItalic = ({ currentStyle, onClick }) => {
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
      <img src={italicIcon} alt="Italic" className={`${styles.img} ${active}`}/>
    </button>
  );
};

export default FontItalic;
