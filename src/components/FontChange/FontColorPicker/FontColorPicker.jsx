import React, { useState, useRef, useEffect } from 'react';
import styles from './FontColorPicker.module.scss';
import useOnClickOutside from '../../utilities/useOnClickOutside'

const FontColorPicker = ({colors, currentColor, onSelectColor }) => {
  const [showColors, setShowColors] = useState(false);
  const ref = useRef();
  const [selectedColor, setSelectedColor] = useState(currentColor || ''); // State để lưu trữ màu chữ đã chọn

  useOnClickOutside(ref, () => {
    setShowColors(false);
  }); // Sử dụng hook

  useEffect(() => {
    // Cập nhật state khi currentColor thay đổi
    setSelectedColor(currentColor);
  }, [currentColor]);

  const handleSelectColor = (color) => {
    onSelectColor(color);
    setSelectedColor(color);
    setShowColors(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowColors(prevShowColors => !prevShowColors);
  };

  return (
    <div ref={ref} className={styles.fontColorPicker}>
      <button onClick={handleClick} style={{ backgroundColor: selectedColor }} className={styles.colorButton}>
        {selectedColor ? selectedColor : 'Select Color'}
      </button>
      {showColors && (
        <ul className={styles.colorList}>
          {colors.map((color, index) => (
            <li key={index} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleSelectColor(color); }}>
              <div className={styles.colorSwatch} style={{ backgroundColor: color }}></div>
              {color}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FontColorPicker;