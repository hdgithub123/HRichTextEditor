import React, { useState, useRef, useEffect } from 'react';
import styles from './ColorPicker.module.scss';
import useAutoAdjustChildPosition from '../../hook/useAutoAdjustChildPosition'
import useOnClickOutside from '../../useOnClickOutside'
import { _COMMONCOLOURS } from '../../../_constant/_constant'


const ColorPicker = ({
  presetColors = _COMMONCOLOURS,
  curentColor = '#FFFFFF',
  isUnlimitedColor = false,
  onChange = () => { },
}) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pickerRef = useRef(null);
  const showpickerRef = useRef(null);

  useEffect(() => {

    setSelectedColor(curentColor?curentColor: 'Select your color')

  }, [curentColor]);


  // Đóng color picker khi click bên ngoài

  useOnClickOutside(pickerRef, () => {
    setShowColorPicker(false)
  })

  useAutoAdjustChildPosition(showpickerRef, showColorPicker)


  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    onChange(newColor);
  };

  const handlePresetColorClick = (color) => {
    setSelectedColor(color);
    onChange(color);
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
        <div ref={showpickerRef} className={styles.picker}>
          {/* Color spectrum input */}
          {isUnlimitedColor && <input
            type="color"
            title='Select a color by clicking here'
            value={selectedColor}
            onChange={handleColorChange}
            className={styles.colorInput}
          />}
          {/* Preset colors section */}
          <div className={styles.presets}>
            <div className={styles.presetsHeader}>
              {selectedColor.toUpperCase()}
            </div>
            <div className={styles.grid}>
              {Object.entries(presetColors).map(([name, color]) => (
                <div
                  key={name}
                  className={styles.presetColor}
                  style={{ backgroundColor: color }}
                  onClick={() => handlePresetColorClick(color)}
                  title={`${name} (${color})`}
                  data-selected={curentColor.toUpperCase() === color.toUpperCase()}
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