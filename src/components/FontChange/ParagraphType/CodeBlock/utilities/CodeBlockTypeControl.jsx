import React, { useEffect,useState } from 'react';
import styles from './CodeBlockTypeControl.module.scss';


const CodeBlockTypeControl = ({ currentCodeBlock,ImageIcon,altImage, onClick }) => {
  const [active, setActive] = useState(styles.unactive);
  
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  useEffect(() => {
    if(currentCodeBlock === altImage) {
      setActive(styles.active)
    } else {
      setActive(styles.unactive)
    }
  }, [currentCodeBlock]);

  return (

    <button className={styles.button} onMouseDown={handleClick}>
          <img src={ImageIcon} alt={altImage} title={altImage} className={`${styles.img} ${active}`}/>
    </button>
  
  );
};


export default CodeBlockTypeControl