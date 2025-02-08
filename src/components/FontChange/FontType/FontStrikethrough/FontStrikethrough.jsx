// import React from 'react';
// import styles from './FontStrikethrough.module.css';
// import strikethroughIcon from './strikethrough.svg'

// const FontStrikethrough = ({ currentItalic, onClick }) => {
//   const handleClick = (e) => {
//     e.preventDefault();
//     onClick();
//   };

//   return (
//     <button className={styles.button} onMouseDown={handleClick} style={{ fontWeight: currentItalic ? 'italic' : 'normal' }}>
//       <img src={strikethroughIcon} alt="Strikethrough" width={'20px'} height={'20px'} />
//     </button>
//   );
// };

// export default FontStrikethrough;



import React, { useEffect,useState } from 'react';
import styles from './FontStrikethrough.module.scss';
import strikethroughIcon from './strikethrough.svg'


const FontStrikethrough = ({ currentStyle, onClick }) => {
  const [active, setActive] = useState(styles.unactive);
  
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  useEffect(() => {
    if(currentStyle) {
      setActive(styles.active)
    } else {
      setActive(styles.unactive)
    }
  }, [currentStyle]);

  return (
    <button className={styles.button} onMouseDown={handleClick}>
      <img src={strikethroughIcon} alt="StrikeThrough" title="StrikeThrough" className={`${styles.img} ${active}`}/>
    </button>
  );
};

export default FontStrikethrough;
