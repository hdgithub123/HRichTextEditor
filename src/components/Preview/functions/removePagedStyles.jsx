const removePagedStyles = () => {
    // Xóa các thẻ <style> có thuộc tính data-pagedjs-inserted-styles='true'
    document.head.querySelectorAll("[data-pagedjs-inserted-styles='true']").forEach((styleElement) => {
        styleElement.parentNode.removeChild(styleElement);
        console.log("Paged.js style removed.");
    });

    // Xóa tất cả các thẻ <style> rỗng
    document.head.querySelectorAll("style").forEach((styleElement) => {
        if (!styleElement.textContent.trim()) { // Kiểm tra nếu nội dung bên trong thẻ <style> rỗng
            styleElement.parentNode.removeChild(styleElement);
            console.log("Empty <style> tag removed.");
        }
    });
};
export default removePagedStyles;