import React from 'react';
import styles from './CodeBlockType.module.css';


const CodeBlockType = ({ currentCodeBlockType, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currentCodeBlockType ? 'italic' : 'normal' }}>
      <img src="./italic.svg" alt="Italic" width={100} height={100} />
      <span>Code Block</span>
    </button>
  );
};

export default CodeBlockType;
