import React, { useState, useEffect } from 'react';
import styles from './PaperSizePicker.module.scss';

const PAPER_SIZES = {
  A0: { name: 'A0', portrait: [841, 1189] },
  A1: { name: 'A1', portrait: [594, 841] },
  A2: { name: 'A2', portrait: [420, 594] },
  A3: { name: 'A3', portrait: [297, 420] },
  A4: { name: 'A4', portrait: [210, 297] },
  A5: { name: 'A5', portrait: [148, 210] },
  A6: { name: 'A6', portrait: [105, 148] },
  LETTER: { name: 'Letter', portrait: [216, 279] },
  LEGAL: { name: 'Legal', portrait: [216, 356] },
};

const PaperSizePicker = ({ 
  defaultSize = 'A4',
  defaultOrientation = 'portrait',
  onChange = () => {}
}) => {
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [orientation, setOrientation] = useState(defaultOrientation);
  const [dimensions, setDimensions] = useState([0, 0]);

  useEffect(() => {
    // Tính toán kích thước khi thay đổi khổ giấy hoặc hướng
    const sizeData = PAPER_SIZES[selectedSize];
    const [width, height] = sizeData.portrait;
    const newDimensions = orientation === 'portrait' 
      ? [width, height] 
      : [height, width];
    
    setDimensions(newDimensions);
    onChange({
      size: selectedSize,
      orientation,
      width: `${newDimensions[0]}mm`,
      height: `${newDimensions[1]}mm`,
      name: `${sizeData.name} ${orientation}`
    });
  }, [selectedSize, orientation]);

  return (
    <div className={styles.container}>
      <div className={styles.sizeSelector}>
        <label>Paper Size:</label>
        <select 
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className={styles.select}
        >
          {Object.entries(PAPER_SIZES).map(([key, size]) => (
            <option key={key} value={key}>
              {size.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.orientationSelector}>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="portrait"
              checked={orientation === 'portrait'}
              onChange={() => setOrientation('portrait')}
            />
            <span>Portrait</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="landscape"
              checked={orientation === 'landscape'}
              onChange={() => setOrientation('landscape')}
            />
            <span>Landscape</span>
          </label>
        </div>
      </div>

      <div className={styles.dimensions}>
        <div className={styles.dimension}>
          <span>Width:</span>
          <strong>{dimensions[0]} mm</strong>
        </div>
        <div className={styles.dimension}>
          <span>Height:</span>
          <strong>{dimensions[1]} mm</strong>
        </div>
      </div>

      {/* Preview (optional) */}
      <div className={styles.preview}>
        <div 
          className={styles.paper}
          style={{
            width: '100%',
            paddingBottom: `${(dimensions[1] / dimensions[0]) * 100}%`,
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <span className={styles.paperName}>
            {PAPER_SIZES[selectedSize].name} {orientation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaperSizePicker;