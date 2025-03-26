import React, { useState, useRef, useEffect } from 'react';
import styles from './ColorPicker.module.scss';
import useOnClickOutside from '../useOnClickOutside';
const ColorPicker = ({
  presetColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#00FFFF', '#FFA500', '#A52A2A', '#800080', '#008000',
    '#000080', '#808000', '#800000', '#008080', '#000000',
    '#FFFFFF', '#C0C0C0', '#808080', '#FFD700', '#FFC0CB'
  ],
  defaultColor = '#FFFFFF',
  onChange = () => { },
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pickerRef = useRef(null);

  // Đóng color picker khi click bên ngoài

  useOnClickOutside(pickerRef,()=>{
    setShowColorPicker(false)
  })
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    onChange(newColor);
  };

  const handlePresetColorClick = (color) => {
    setSelectedColor(color);
    onChange(color);
    // setShowColorPicker(false); // Đóng picker sau khi chọn màu
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className={styles.colorPickerContainer} ref={pickerRef}>
      {/* Nút trigger hiển thị màu đã chọn */}
      <button
        className={styles.colorTrigger}
        style={{ backgroundColor: selectedColor }}
        onClick={toggleColorPicker}
      />

      {/* Bảng chọn màu (ẩn/hiện) */}
      {showColorPicker && (
        <div className={styles.picker}>
          {/* Color spectrum input */}
          <input
            type="color"
            title='Select a color by clicking here'
            value={selectedColor}
            onChange={handleColorChange}
            className={styles.colorInput}
          />
          {/* Preset colors section */}
          <div className={styles.presets}>
            <div className={styles.presetsHeader}>
              {selectedColor.toUpperCase()}
            </div>
            <div className={styles.grid}>
              {presetColors.map((color, index) => (
                <div
                  key={index}
                  className={styles.presetColor}
                  style={{ backgroundColor: color }}
                  onClick={() => handlePresetColorClick(color)}
                  title={color}
                  data-selected={selectedColor.toUpperCase() === color.toUpperCase()}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;