import React, { useEffect,useState } from 'react';
import styles from './FontUnderline.module.scss';
import underLineIcon from './underline.svg'


const FontUnderline = ({ currentStyle, onClick }) => {
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
      <img src={underLineIcon} alt="underLine" className={`${styles.img} ${active}`}/>
    </button>
  );
};

export default FontUnderline;