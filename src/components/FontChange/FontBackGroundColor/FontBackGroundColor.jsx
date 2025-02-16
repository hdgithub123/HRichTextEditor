import React, { useState, useRef, useEffect } from 'react';
import styles from './FontBackGroundColor.module.scss';
import useOnClickOutside from '../../utilities/useOnClickOutside'

const FontBackGroundColor = ({ colors, currentBackGroundColor, onSelectBackGroundColor }) => {
  const [showColors, setShowColors] = useState(false);
  const ref = useRef();
  const [selectedColor, setSelectedColor] = useState(currentBackGroundColor || ''); // State để lưu trữ màu nền chữ đã chọn

  useOnClickOutside(ref, () => {
    setShowColors(false);
  }); // Sử dụng hook

  useEffect(() => {
    // Cập nhật state khi currentBackGroundColor thay đổi
    setSelectedColor(currentBackGroundColor);
  }, [currentBackGroundColor]);

  const handleSelectColor = (color) => {
    onSelectBackGroundColor(color);
    setSelectedColor(color);
    setShowColors(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowColors(prevShowColors => !prevShowColors);
  };



  return (
    <div ref={ref} className={styles.fontColorPicker} title='Font background'>
      <div className={styles.containColorPicker} >
        <div style={{ backgroundColor: selectedColor }}></div>
        <button onClick={handleClick}>
          ⯆
        </button>
      </div>
      {showColors && (<div className={styles.colorList}>
        <ul>
          {colors.map((color, index) => (
            <li key={index} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleSelectColor(color); }}>
              <div className={styles.colorSwatch} style={{ backgroundColor: color }}></div>
              {color}
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
};

export default FontBackGroundColor;

