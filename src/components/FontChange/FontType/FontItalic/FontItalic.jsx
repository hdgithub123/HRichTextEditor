import React from 'react';
import styles from './FontItalic.module.css';


const FontItalic = ({ currentItalic, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currentItalic ? 'italic' : 'normal' }}>
      <img src="./italic.svg" alt="Italic" width={100} height={100} />
    </button>
  );
};

export default FontItalic;
