import React from 'react';
import styles from './FontSuperscript.module.css';


const FontSuperscript = ({ currentSuperscript, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currentSuperscript ? 'italic' : 'normal' }}>
      <img src="./itlic.svg" alt="Italic" width={100} height={100} />
    <span>Superscript</span>
    </button>
  );
};

export default FontSuperscript;
