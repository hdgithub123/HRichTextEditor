const removePageStyle= () => {
    // Tìm thẻ <style> bằng id "dynamic-style"
    let styleTag = document.getElementById("dynamic-style");
    
    // Nếu tồn tại, xóa nó khỏi DOM
    if (styleTag) {
      styleTag.parentNode.removeChild(styleTag);
      console.log("Thẻ <style> với id 'dynamic-style' đã được xóa.");
    } else {
      console.log("Không tìm thấy thẻ <style> với id 'dynamic-style'.");
    }
  }

  
export default removePageStyle