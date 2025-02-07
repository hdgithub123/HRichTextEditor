import React from 'react';
import styles from './CodeBlockType.module.css';


const CodeBlockType = ({ currentCodeBlockType, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button className={styles.button} onMouseDown={handleClick}>
      <img src="./italic.svg" alt="Italic"/>
      <span>Code Block</span>
    </button>
  );
};

export default CodeBlockType;
