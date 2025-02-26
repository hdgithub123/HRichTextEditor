import React, { forwardRef, useRef, useState, useEffect } from 'react';
import pxToUnit from './pxToUnit';
const PageNumbers = ({
  contentRef,
  pageHeight = 297,
  unit = "mm",
  position = "bottom-right",
  format = "Page {page} of {total}", // Cho phép tùy chỉnh văn bản hiển thị
  style = {}, // Style do người dùng truyền vào
}) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    if (!contentRef.current) return;

    requestAnimationFrame(() => {
      const convertedHeight = pageHeight / pxToUnit(1, unit)
      const totalPages = Math.ceil(contentRef.current.scrollHeight / convertedHeight);

      const validPositions = ["top-left", "top-right", "bottom-left", "bottom-right"];

      if (!validPositions.includes(position)) {
        position = "bottom-right"; // Gán lại giá trị mặc định nếu sai
      }

      const positions = {
        "top-left": (i) => ({ top: `${i * convertedHeight + 10}px`, left: "10px" }),
        "top-right": (i) => ({ top: `${i * convertedHeight + 10}px`, right: "10px" }),
        "bottom-left": (i) => ({ top: `${(i + 1) * convertedHeight - 30}px`, left: "10px" }),
        "bottom-right": (i) => ({ top: `${(i + 1) * convertedHeight - 30}px`, right: "10px" }),
      };

      const numbers = [];
      for (let i = 0; i < totalPages; i++) {
        const pageText = format.replace("{page}", i + 1).replace("{total}", totalPages);

        numbers.push(
          <div
            key={i}
            className="page-number"
            style={{
              position: "absolute",
              ...positions[position](i), // Vị trí theo vị trí hợp lệ
              ...style, // Ghi đè style từ props
            }}
          >
            {pageText}
          </div>
        );
      }

      setPageNumbers(numbers);
    });
  }, [contentRef, pageHeight, unit, position, format, style]);

  return <>{pageNumbers}</>;
};


export default PageNumbers