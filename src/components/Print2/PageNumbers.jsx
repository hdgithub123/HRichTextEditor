import React, { forwardRef, useRef, useState, useEffect, useLayoutEffect } from 'react';
import pxToUnit from './pxToUnit';
const PageNumbers = ({
  contentRef,
  pageHeight = '297mm',
  // unit = "mm",
  position = "bottom-right",
  format = "Page {page} of {total}", // Cho phép tùy chỉnh văn bản hiển thị
  style = {}, // Style do người dùng truyền vào
}) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    if (!contentRef.current) return;

    requestAnimationFrame(() => {
      // const convertedHeight = pageHeight / pxToUnit(1, unit)
      const convertedHeight = unitToPx(pageHeight)
      console.log("convertedHeight", convertedHeight)
      const rowHeights = [...contentRef.current.querySelectorAll("tr")].map(row => row.offsetHeight);
      const totalHeight = rowHeights.reduce((sum, h) => sum + h, 0);

      // const totalPages = Math.ceil(totalHeight / convertedHeight);
      const pageRatio = totalHeight / convertedHeight;
      const totalPages = Number.isInteger(pageRatio) ? pageRatio : Math.floor(pageRatio) + (pageRatio % 1 > 0.95 ? 1 : 0);

      console.log("totalHeight", totalHeight)
      console.log("totalPages", totalPages)


 

  


      const validPositions = ["top-left", "top-right", "bottom-left", "bottom-right"];

      if (!validPositions.includes(position)) {
        position = "bottom-right"; // Gán lại giá trị mặc định nếu sai
      }

      // const positions = {
      //   "top-left": (i) => ({ top: `${i * convertedHeight + 10}px`, left: "10px" }),
      //   "top-right": (i) => ({ top: `${i * convertedHeight + 30}px`, right: "10px" }),
      //   "bottom-left": (i) => ({ top: `${(i + 1) * convertedHeight - 30}px`, left: "10px" }),
      //   "bottom-right": (i) => ({ top: `${(i + 1) * convertedHeight - 30}px`, right: "10px" }),
      // };

      // const positions = {
      //   "top-left": (i) => ({ top: `${i * 297 + 10}mm`, left: "10px" }),
      //   "top-right": (i) => ({ top: `${i * convertedHeight + 30}px`, right: "10px" }),
      //   "bottom-left": (i) => ({ top: `${(i + 1) * convertedHeight - 30}px`, left: "10px" }),
      //   "bottom-right": (i) => ({ top: `${(i + 1) * convertedHeight - 30}px`, right: "10px" }),
      // };


      const positions = {
        "top-left": (i) => ({ top: `${i * convertedHeight}px`, left: "10px" }),
        "top-right": (i) => ({ top: `${i * convertedHeight}px`, right: "10px" }),
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
  }, [contentRef, pageHeight, position, format, style]);

  return <>{pageNumbers}</>;
};


export default PageNumbers




function unitToPx(valueWithUnit) {
  const div = document.createElement("div");
  div.style.height = valueWithUnit; // Gán chiều cao theo đơn vị nhập vào
  div.style.width = "1px"; // Đặt chiều rộng nhỏ để tránh ảnh hưởng layout
  div.style.position = "absolute";
  div.style.top = "-100%"; // Đưa ra ngoài viewport
  div.style.left = "-100%";

  document.body.appendChild(div);

  const computedHeight = parseFloat(window.getComputedStyle(div).height);

  document.body.removeChild(div);

  return computedHeight;
}
