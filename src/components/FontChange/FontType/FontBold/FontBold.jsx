import React, { useEffect,useState } from 'react';
import styles from './FontBold.module.scss';
import boldIcon from './bold.svg'


const FontBold = ({ currentStyle, onClick }) => {
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
      <img src={boldIcon} alt="Bold" className={`${styles.img} ${active}`}/>
    </button>
  );
};

export default FontBold;