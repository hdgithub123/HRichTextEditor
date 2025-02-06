import React from 'react';
import styles from './FontStrikethrough.module.css';


const FontStrikethrough = ({ currentItalic, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currentItalic ? 'italic' : 'normal' }}>
      <img src="./strikeThrough.svg" alt="Strikethrough" width={'20px'} height={'20px'} />
    </button>
  );
};

export default FontStrikethrough;
