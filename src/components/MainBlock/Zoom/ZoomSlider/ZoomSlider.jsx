import React, { useState, useEffect } from 'react';
import styles from './ZoomSlider.module.scss';

const ZoomSlider = ({
  initialZoom = 100,
  minZoom = 50,
  maxZoom = 200,
  step = 5,
  onChange = () => { }
}) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [isDragging, setIsDragging] = useState(false);

  // Gọi callback khi zoom thay đổi
  useEffect(() => {
    onChange(zoom / 100);
  }, [zoom]);

  const handleSliderChange = (e) => {
    setZoom(parseInt(e.target.value));
  };

  const resetZoom = () => {
    setZoom(100);
  };

  return (
    <div className={styles.zoomSliderContainer}>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={minZoom}
          max={maxZoom}
          value={zoom}
          step={step}
          onChange={handleSliderChange}
          className={styles.zoomSlider}
          aria-label="Zoom level"
        />
        <span className={styles.zoomValue}>{zoom}%</span>
      </div>
      <button
        onClick={resetZoom}
        className={styles.resetButton}
      >
        Reset
      </button>
    </div>
  );
};

export default ZoomSlider;