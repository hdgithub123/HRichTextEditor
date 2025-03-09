const updatePageSize = ({ width, height }) => {
  if (width && height) {
    // Tìm hoặc tạo thẻ <style> trong <head>
    let styleTag = document.getElementById("dynamic-style");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "dynamic-style";
      document.head.appendChild(styleTag);
    }

    // Cập nhật hoặc thêm quy tắc @page với kích thước mới
    styleTag.innerHTML = `
    @page {
      size: ${width} ${height};
    }
  `;

    console.log(`@page size is updated: ${width} x ${height}`);
  } else {
    console.log(`@page size is not updated`);
  }

}


export default updatePageSize