import React, { useLayoutEffect,useEffect ,useRef,useState} from "react";
// import pagedjs from "pagedjs";
import { Previewer } from "pagedjs";





const Preview = ({ childrenRef }) => {
  const previewRef = useRef(null);
  const [pageSize, setPageSize] = useState({ width: "210mm", height: "297mm" }); // Mặc định A4

  const customCSS = `
header{
    position: running(titleHeaderRunning);
}

#idCuoi{
    position: running(titleFooterRunning);
}





@page {

    size: A5;


    @bottom-right {
        content: "Trang " counter(page) " / " counter(pages);
    }
}

.pagedjs_page {
    background: white;
    box-shadow: 10px 12px 30px 0 rgba(0, 0, 0, 0.1);
    margin-top: 1rem;


}



.pagedjs_first_page {
    color: blue;
}

/* ✅ Trang chẵn (trái) có nền khác */
.pagedjs_left_page {
    background: pink;
}

/* ✅ Trang lẻ (phải) có nền trắng */
.pagedjs_right_page {
    background: white;
}




/* ✅ Lề trang (header/footer) */
.pagedjs_margin {
    font-size: 12px;
    color: gray;
}

/* ✅ Header (trang đầu tiên có tiêu đề lớn hơn) */
.pagedjs_margin-top {
    font-size: 14px;
    font-weight: bold;
}

/* ✅ Footer hiển thị số trang */
.pagedjs_margin-bottom::after {
    /* content: "Trang " counter(page) " / " counter(pages); */
    text-align: center;
    display: block;
    /* width: 30px;
    height: 20px; */
    font-size: 10px;
    color: yellow;
    z-index: 1000;
}
`;

useEffect(() => {
  if (!childrenRef?.current) return;

  // 🔥 Lấy kích thước thực tế của children
  const { offsetWidth, offsetHeight } = childrenRef.current;
  if (offsetWidth && offsetHeight) {
    setPageSize({ width: `${offsetWidth}px`, height: `${offsetHeight}px` });
  }
}, [childrenRef]);




useEffect(() => {
    if (!childrenRef?.current) return;
    // const headerElement = childrenRef.current.querySelectorAll("header")[0];

    // if (headerElement) {
    //   // Clone header và thêm vào trước khi phân trang
    //   const clonedHeader = headerElement.cloneNode(true);
    //   clonedHeader.style.visibility = "hidden"; // Ẩn bản gốc trong nội dung chính
    //   clonedHeader.setAttribute("id", "extracted-header");
    //   document.body.appendChild(clonedHeader);
    // }



    // const styleElement = document.createElement("style");
    // styleElement.innerHTML = customCSS;
    // document.head.appendChild(styleElement);

    // document.documentElement.style.setProperty("--pagedjs-pagebox-width", "100mm");
    // document.documentElement.style.setProperty("--pagedjs-width-right", "100mm");
    // document.documentElement.style.setProperty("--pagedjs-height-right", "100mm");
    


    
const linkcss = './Preview.css'



    const previewer = new Previewer();    
    previewer
      .preview(childrenRef.current.innerHTML, [linkcss], previewRef.current)
      .then((flow) => {
        console.log("Preview rendered, total pages:", flow.total);
      });

    return () => {
      document.head
        .querySelectorAll("[data-pagedjs-inserted-styles]")
        .forEach((e) => e.parentNode?.removeChild(e));
    };
  }, [childrenRef]);



// useEffect(() => {
//   if (!childrenRef?.current) return;

//   const previewer = new Previewer();

//   // 🔥 Dùng MutationObserver để theo dõi khi header xuất hiện
//   const observer = new MutationObserver(() => {
//     const headerElement = document.querySelector("#headerID");
//     if (headerElement) {
//       console.log("Header đã render, bắt đầu phân trang...");
//       observer.disconnect(); // Ngừng theo dõi sau khi tìm thấy

//       previewer
//         .preview(childrenRef.current, ['./Preview.css'], previewRef.current)
//         .then((flow) => {
//           console.log("Preview rendered, total pages:", flow.total);
//         });
//     }
//   });

//   // 🔥 Quan sát thay đổi trong toàn bộ DOM để phát hiện header
//   observer.observe(document.body, { childList: true, subtree: true });

//   return () => observer.disconnect();
// }, [childrenRef]);


  return <div id="preview" ref={previewRef}></div>;
};

export default Preview;
