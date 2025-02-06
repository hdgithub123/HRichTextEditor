
import React from 'react';
import styles from './FontUnderline.module.css';


const FontUnderline = ({ currentItalic, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currentItalic ? 'italic' : 'normal' }}>
      <img src="./underline.svg" alt="Underline" width={100} height={100} />
    </button>
  );
};

export default FontUnderline;
