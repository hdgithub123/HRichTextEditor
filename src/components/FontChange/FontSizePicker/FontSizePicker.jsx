import React, { useState, useRef, useEffect } from 'react';
import styles from './FontSizePicker.module.css';

const FontSizePicker = ({ sizes, currentSize, onSelectSize }) => {
  const [query, setQuery] = useState(currentSize ? currentSize : '');
  const [filteredSizes, setFilteredSizes] = useState(sizes);
  const [showSize, setShowSize] = useState(false);
  const ref = useRef();
  const [selectedSize, setSelectedSize] = useState(currentSize || ''); // State để lưu trữ kích thước font chữ đã chọn

  useOnClickOutside(ref, () => {
    setShowSize(false);
  }); // Sử dụng hook

  const handleInputChange = (e) => {
    setShowSize(true);
    const value = e.target.value;
    setQuery(value);
  };

  useEffect(() => {
    if (query) {
      const newFilteredSizes = sizes.filter(size =>
        size.toString().includes(query)
      );
      setFilteredSizes(newFilteredSizes);
    } else {
      setFilteredSizes(sizes);
    }
  }, [query]);

  useEffect(() => {
    // Cập nhật state khi currentSize thay đổi
    setSelectedSize(currentSize);
    setQuery(currentSize);
  }, [currentSize]);

  const handleSelectSize = (size) => {
    onSelectSize(size);
    setSelectedSize(size);
    setQuery(size);
    setShowSize(false);
  };

  const handleClearQuery = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuery(''); // Đặt lại query về chuỗi rỗng
    setShowSize(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSize(prevShowSize => !prevShowSize);
  };

  return (
    <div ref={ref} className={styles.fontSizePicker}>
      <input
        type="text"
        placeholder={selectedSize ? `${selectedSize}pt...` : "Search sizes..."} // Sửa dòng này
        value={query}
        onChange={handleInputChange}
        className={styles.input}
        // onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click làm mất tiêu điểm của ô text
        onClick={handleClick} // Ngăn chặn sự kiện click làm mất tiêu điểm của ô text
      />
      <button onMouseDown={handleClearQuery} className={styles.clearButton}>Clear</button> {/* Nút Clear */}
      {showSize && (
        <ul className={styles.fontList} style={{ listStyle: 'none', padding: 0 }}>
          {filteredSizes.map((size, index) => (
            <li key={index} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleSelectSize(size); }} style={{ cursor: 'pointer', padding: '5px' }}>
              {size}pt
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FontSizePicker;

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Kiểm tra nếu click bên ngoài ref
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};