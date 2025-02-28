function pxToUnit(px, unit) {
    const dpi = getDPI();
    const fontSize = getRootFontSize();
    const mmPerInch = 25.4; // 1 inch = 25.4 mm
    const mm = (px / dpi) * mmPerInch;
  
    switch (unit) {
      case 'mm':
          return mm;
      case 'cm':
          return mm / 10;
      case 'dm':
          return mm / 100;
      case 'm':
          return mm / 1000;
      case 'rem':
      case 'em':
          return (px / fontSize);
      case 'px':
          return px;
      default:
          return null;
  }
  }
  
  
  export default pxToUnit;



  function getDPI() {
    let dpi = 96; // Mặc định 96 nếu không lấy được giá trị hợp lệ
    let div = document.createElement("div");
    div.style.height = "1in";
    div.style.width = "1in";
    div.style.position = "absolute";
    div.style.top = "-100%";
    div.style.left = "-100%";
    document.body.appendChild(div);
  
    let measuredDPI = div.offsetHeight;
    document.body.removeChild(div);
  
    return measuredDPI > 0 ? measuredDPI : dpi;
  }


//   function getDPI() {
//     let div = document.createElement("div");
//     div.style.height = "1in";
//     div.style.width = "1in";
//     div.style.top = "-100%";
//     div.style.left = "-100%";
//     div.style.position = "absolute";
  
//     document.body.appendChild(div);
  
//     let result = div.offsetHeight;
  
//     document.body.removeChild(div);
  
//     return result;
  
//   }
  
  
  function getRootFontSize() {
    const rootElement = document.documentElement; // <html> element
    const fontSize = window.getComputedStyle(rootElement).fontSize;
    return parseFloat(fontSize); // Chuyển đổi giá trị từ chuỗi sang số
  }