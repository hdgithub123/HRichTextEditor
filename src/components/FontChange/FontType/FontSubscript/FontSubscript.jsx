import React, { useEffect,useState } from 'react';
import styles from './FontSubscript.module.scss';
import subscriptIcon from './subscript.svg'


const FontSubscript = ({ currentStyle, onClick }) => {
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
      <img src={subscriptIcon} alt="Bold" className={`${styles.img} ${active}`}/>
    </button>
  );
};

export default FontSubscript;
