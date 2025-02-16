import React, { useState, useRef, useEffect } from 'react';
import styles from './FontFamilyPicker.module.scss';
import useOnClickOutside from '../../utilities/useOnClickOutside'


const FontFamilyPicker = ({ Fonts, currentFont, onSelectFont }) => {
  const [query, setQuery] = useState(currentFont ? currentFont : '');
  const [filteredFonts, setFilteredFonts] = useState(Fonts);
  const [showFont, setShowFont] = useState(false);
  const ref = useRef();
  const [selectedFont, setSelectedFont] = useState(currentFont || ''); // State để lưu trữ font chữ đã chọn

  useOnClickOutside(ref, () => {
    setShowFont(false);
  }); // Sử dụng hook

  const handleInputChange = (e) => {
    setShowFont(true);
    const value = e.target.value;
    setQuery(value);
  };

  useEffect(() => {
    if (query) {
      // const newFilteredFonts = fonts.filter(font =>
      const newFilteredFonts = Fonts.filter(font =>
        font.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFonts(newFilteredFonts);
    } else {
      setFilteredFonts(Fonts);
    }
  }, [query]);


  useEffect(() => {
    // Cập nhật state khi currentFont thay đổi
    setSelectedFont(currentFont);
    setQuery(currentFont);
  }, [currentFont]);


  const handleSelectFont = (font) => {
    onSelectFont(font);
    setSelectedFont(font);
    setQuery(font);
    setShowFont(false);
  };

  const handleClearQuery = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuery(''); // Đặt lại query về chuỗi rỗng
    setShowFont(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setShowFont(prevShowFont => !prevShowFont);
    setShowFont(true);
  };

  return (
    <div ref={ref} className={styles.fontPicker}  >
      <div className={styles.input}>
        <input
          type="text"
          placeholder={selectedFont ? `${selectedFont}...` : "Search fonts..."}
          value={query}
          title='Font Family'
          onChange={handleInputChange}
          className={styles.input}
          style={{ fontFamily: selectedFont }}
          onClick={handleClick}
        />
        <button onClick={handleClearQuery}>
          ⯆
        </button>
      </div>

      {showFont && (<div className={styles.fontList}>
        <ul>
          {filteredFonts.map((font, index) => (
            <li key={index} onClick={() => handleSelectFont(font)} style={{ cursor: 'pointer', padding: '5px', fontFamily: font }}>
              {font}
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
};


export default FontFamilyPicker;