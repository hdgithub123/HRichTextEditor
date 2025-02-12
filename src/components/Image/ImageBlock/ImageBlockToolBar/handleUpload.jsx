const handleUpload = (file, callback) => {
    // Kiểm tra loại tệp trước khi đọc
    if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
            callback(true, reader.result); // Giả sử tải lên thành công và trả về URL của hình ảnh
        };
        reader.onerror = () => {
            callback(false, null); // Giả sử tải lên thất bại
        };
        reader.readAsDataURL(file);
    } else {
        callback(false, null); // Tệp không hợp lệ
    }
};


export default handleUpload