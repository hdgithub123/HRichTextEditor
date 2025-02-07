// import React from 'react';
// import styles from './FontUppercase.module.css';


// const FontUppercase = ({ currentStyle, onClick }) => {
//   const handleClick = (e) => {
//     e.preventDefault();
//     onClick();
//   };

//   return (
//     <button className={styles.button} onMouseDown={handleClick}>
//       <img src="./itlic.svg" alt="Uppercase" width={100} height={100} />
//     <span>Uppercase</span>
//     </button>
//   );
// };

// export default FontUppercase;


import React, { useEffect,useState } from 'react';
import styles from './FontUppercase.module.scss';
import uppercaseIcon from './uppercase.svg'


const FontUppercase = ({ currentStyle, onClick }) => {
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
      <img src={uppercaseIcon} alt="Bold" className={`${styles.img} ${active}`}/>
    </button>
  );
};

export default FontUppercase;