import React from 'react';
import styles from './FontSubscript.module.css';


const FontSubscript = ({ currentItalic, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currentItalic ? 'italic' : 'normal' }}>
      <img src="./itamlic.svg" alt="Italic" width={100} height={100} />
    <span>Subscript</span>
    </button>
  );
};

export default FontSubscript;
