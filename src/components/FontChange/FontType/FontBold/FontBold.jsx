import React from 'react';
import styles from './FontBold.module.css';


const FontBold = ({ currentBold, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currentBold ? 'bold' : 'normal' }}>
      <img src="./bold.svg" alt="Bold" width={100} height={100} />
    </button>
  );
};

export default FontBold;
