import React, { useState } from 'react';
import styles from './HeaderType.module.css';

const HeaderType = ({ currentHeaderType, onClick }) => {
  const [selectedHeader, setSelectedHeader] = useState(currentHeaderType || 'header-one');

  const handleSelectChange = (e) => {
    setSelectedHeader(e.target.value);
    onClick(e.target.value);
  };

  return (
    <div className={styles.headerTypeContainer}>
      <select value={selectedHeader} onChange={handleSelectChange} className={styles.select}>
        <option value="header-one">H1</option>
        <option value="header-two">H2</option>
        <option value="header-three">H3</option>
        <option value="header-four">H4</option>
        <option value="header-five">H5</option>
        <option value="header-six">H6</option>
      </select>
    </div>
  );
};

export default HeaderType;