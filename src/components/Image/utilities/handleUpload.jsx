
const handleUpload = (file, callback, maxSize = 1 * 1024 * 1024) => { // maxSize mặc định là 5MB
    // Kiểm tra loại tệp trước khi đọc
    if (file instanceof Blob) {
        // Kiểm tra kích thước file
        if (file.size > maxSize) {
            callback(false, null, 'File size exceeds the limit'); // Giả sử tải lên thất bại do kích thước file
            return;
        }

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

export default handleUpload;