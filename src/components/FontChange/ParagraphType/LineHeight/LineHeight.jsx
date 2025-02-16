import React, { useState, useRef, useEffect } from 'react';
import styles from './LineHeight.module.scss';
import useOnClickOutside from '../../../utilities/useOnClickOutside'

const LineHeight = ({ heights, curentHeight, onSelectHeight }) => {
  const [showHeights, setShowHeights] = useState(false);
  const ref = useRef();
  const [selectedHeight, setSelectedHeight] = useState(curentHeight || 'normal'); // State để lưu trữ màu chữ đã chọn

  useOnClickOutside(ref, () => {
    setShowHeights(false);
  }); // Sử dụng hook

  useEffect(() => {
    // Cập nhật state khi curentHeight thay đổi
    setSelectedHeight(curentHeight);
  }, [curentHeight]);

  const handleSelectHeight = (height) => {
    onSelectHeight(height);
    setSelectedHeight(height);
    setShowHeights(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowHeights(prevShowHeights => !prevShowHeights);
  };

  const handleDetailClick = (e, height) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelectHeight(height);
  }


  return (
    <div ref={ref} className={styles.lineHeightPicker} title='Line Space'>
      <div className={styles.containHeightPicker} >
        <div>{selectedHeight}</div>
        <button onClick={handleClick}>
          ⯆
        </button>
      </div>

      {showHeights && ( <div className={styles.heights}>
        <ul >
          {heights.map((height, index) => (
            <li key={index} onMouseDown={(e) => handleDetailClick(e, height)}>
              {height}
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
};

export default LineHeight;