import React, { useState } from 'react';
import styles from './ColorPicker.module.scss';

const ColorPicker = ({ 
  presetColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', 
    '#00FFFF', '#FFA500', '#A52A2A', '#800080', '#008000',
    '#000080', '#808000', '#800000', '#008080', '#000000',
    '#FFFFFF', '#C0C0C0', '#808080', '#FFD700', '#FFC0CB'
  ],
  defaultColor = '#FFFFFF',
  onChange,
}) => {

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [showPresets, setShowPresets] = useState(true);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    onChange(e.target.value)
  };

  const handlePresetColorClick = (color) => {
    setSelectedColor(color);
    onChange(color)
  };

  const togglePresets = () => {
    setShowPresets(!showPresets);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{selectedColor.toUpperCase()}</h1>
      
      <div className={styles.picker}>
        {/* Color spectrum input */}
        <div className={styles.spectrum}>
          <input 
            type="color" 
            value={selectedColor} 
            onChange={handleColorChange}
            className={styles.colorInput}
          />
        </div>
                
        {/* Preset colors section */}
        <div className={styles.presets}>
          <div className={styles.presetsHeader} onClick={togglePresets}>
            <h3>Select Color</h3>
            <span className={styles.toggleIcon}>
              {showPresets ? '▼' : '▶'}
            </span>
          </div>
          
          {showPresets && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker