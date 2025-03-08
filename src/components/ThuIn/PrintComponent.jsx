import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import './PrintComponent.css'


// const PrintContent = () => {
//   return (
//     <div className="printContainer">
//       <h1>Tiêu đề in</h1>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       <p>Đây là nội dung trong tài liệu cần in.</p>
//       {/* <div className="customBox">Hộp nội dung tùy chỉnh</div> */}
//     </div>
//   );
// };




const PrintContent = () => {
  // Tạo một mảng chứa 100 phần tử
  const contentArray = Array.from({ length: 1000 }, (_, index) => (
    <p key={index}> {index}Đây là nội dung trong tài liệu cần in.</p>
  ));

  return (
    <div className="printContainer">
      <h1>Danh sách nội dung</h1>
      {contentArray}
    </div>
  );
};



const PrintComponent = () => {
  const componentRef = useRef(); // Tham chiếu đến component cần in

  const handlePrint = useReactToPrint({
    documentTitle: 'Title',
    contentRef: componentRef,
    onBeforePrint: async () => {
      // Thực hiện thao tác bất đồng bộ trước khi in
      await new Promise(resolve => setTimeout(resolve, 2000)); // Ví dụ: Chờ 2 giây

      console.log(" dang chuan bi in")
    },
  });

  const chinhTrangA3 = () => {
    const mainDiv = document.getElementById("printID"); // Lấy phần tử có id="mainID"
    if (mainDiv) {
      mainDiv.style.setProperty("--new-width", "297mm"); // Gán giá trị cho --new-width
      mainDiv.style.setProperty("--new-height", "420mm"); // Gán giá trị cho --new-height
    }
    updatePageSize("297mm", "420mm"); // Đặt khổ giấy A4 portrait
  }

  const chinhTrangA4 = () => {
    const mainDiv = document.getElementById("printID"); // Lấy phần tử có id="mainID"
    if (mainDiv) {
      // mainDiv.style.setProperty("--new-width", "210mm"); // Gán giá trị cho --new-width
      // mainDiv.style.setProperty("--new-height", "297mm"); // Gán giá trị cho --new-height

       mainDiv.style.setProperty("--new-margin", "20mm"); // Gán giá trị cho --new-margin
       mainDiv.style.setProperty("--background-color", "blue");
    }

    updatePageSize("210mm", "297mm","0mm"); // Đặt khổ giấy A4 portrait
  }


  const chinhTrangA5 = () => {
    const mainDiv = document.getElementById("printID"); // Lấy phần tử có id="mainID"
    if (mainDiv) {
      // mainDiv.style.setProperty("--new-width", "148mm"); // Gán giá trị cho --new-width
      // mainDiv.style.setProperty("--new-height", "210mm"); // Gán giá trị cho --new-height
      mainDiv.style.setProperty("--new-margin", "20mm"); // Gán giá trị cho --new-margin 
      mainDiv.style.setProperty("--background-color", "red");
    }
    updatePageSize("148mm", "210mm","20mm");
  }




  return (
    <div>
      <h1>In Tài Liệu</h1>
      <div id='printID' ref={componentRef} className="content">
        <PrintContent />
      </div>
      <button onClick={handlePrint} style={{ marginTop: "20px" }}>
        In nội dung
      </button>
      <button onClick={chinhTrangA5} style={{ marginTop: "20px" }}>
        chinh tram-ngA5
      </button>
      <button onClick={chinhTrangA4} style={{ marginTop: "20px" }}>
        chinh tramgA4
      </button>
      <button onClick={chinhTrangA3} style={{ marginTop: "20px" }}>
        chinh tramgA3
      </button>
    </div>
  );
};

export default PrintComponent;



function updatePageSize(width, height, margin) {
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
      margin: ${margin};
    }
    

  `;

  console.log(`@page size được cập nhật thành: ${width} x ${height}`);
}

// Ví dụ sử dụng

// updatePageSize("297mm", "210mm"); // Đặt khổ giấy A4 landscape
