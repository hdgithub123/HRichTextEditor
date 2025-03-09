const removePageStyle= () => {
    // Tìm thẻ <style> bằng id "dynamic-style"
    let styleTag = document.getElementById("dynamic-style");
    
    // Nếu tồn tại, xóa nó khỏi DOM
    if (styleTag) {
      styleTag.parentNode.removeChild(styleTag);
    } else {
      console.log("Not have id 'dynamic-style'.");
    }
  }

  
export default removePageStyle