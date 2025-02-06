import React from 'react';
import styles from './FontUppercase.module.css';


const FontUppercase = ({ currenttUppercase, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currenttUppercase ? 'italic' : 'normal' }}>
      <img src="./itlic.svg" alt="Uppercase" width={100} height={100} />
    <span>Uppercase</span>
    </button>
  );
};

export default FontUppercase;
