const changePageStyles = (css) => {
  // Kiểm tra xem đã tồn tại thẻ style với id="dynamic-style" hay chưa
  let styleTag = document.getElementById("pagedjs-style");

  if (styleTag) {
      // Nếu tồn tại, chỉ cần cập nhật nội dung CSS
      styleTag.textContent = css;
  } else {
      // Nếu chưa tồn tại, tạo thẻ style mới
      styleTag = document.createElement("style");
      styleTag.type = "text/css";
      styleTag.id = "pagedjs-style"; // Thêm id vào thẻ style
      styleTag.appendChild(document.createTextNode(css));
      document.head.appendChild(styleTag);
  }
};

export default changePageStyles;
