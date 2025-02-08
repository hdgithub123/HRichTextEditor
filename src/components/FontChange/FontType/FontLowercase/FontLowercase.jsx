import React, { useEffect,useState } from 'react';
import styles from './FontLowercase.module.scss';
import icon from './lowercase.svg'


const FontLowercase = ({ currentStyle, onClick }) => {
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
      <img src={icon} alt="Lowercase" title="Lowercase" className={`${styles.img} ${active}`}/>
    </button>
  );
};

export default FontLowercase;
