import React from 'react';
import styles from './FontLowercase.module.css';


const FontLowercase = ({ currenttLowercase, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currenttLowercase ? 'italic' : 'normal' }}>
      <img src="./itlic.svg" alt="Uppercase" width={100} height={100} />
      <span>Lowercase</span>
    </button>
  );
};

export default FontLowercase;
