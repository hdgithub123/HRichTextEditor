import { evaluate } from "mathjs"; // Import mathjs để tính toán đúng
import { formatNumber, formatVnNumber, formatUsNumber } from "./fomatcell";
import { VND, USD } from "./functionExpress"; // Import hàm VND từ file functionExpress

function evaluateExpressionsInString({ str, functionFomatNumberArray = [formatNumber, formatVnNumber, formatUsNumber], functionExpressArray = [VND] }) {
    // Bước 1: Xử lý các biểu thức toán học trong []
    let processedString = str.replace(/\[([^\[\]]+)\]/g, (match, expression) => {
        try {
            return evaluate(expression).toString();
        } catch (error) {
            return match;
        }
    });


   // Bước 1.5: Xử lý các hàm định dạng số
    if (functionFomatNumberArray && functionFomatNumberArray.length > 0) {
        functionFomatNumberArray.forEach(formatFunc => {
            const funcName = formatFunc.name;
            // Regex cho pattern như formatNumber(number,1) hoặc formatNumber(number)
            const regex = new RegExp(`${funcName}\\(([\\d]+[\\.,]?[\\d]*)(?:,s*([\\d]+))?\\)`, 'g');
            processedString = processedString.replace(regex, (match, number, decimalPlaces) => {
                try {
                    const num = parseFloat(number);
                    if (decimalPlaces !== undefined) {
                        return formatFunc(num, parseInt(decimalPlaces, 10));
                    }
                    return formatFunc(num);
                } catch (error) {
                    return match;
                }
            });
        });
    }


    // Bước 2: Xử lý các hàm tùy chỉnh trong functionArray
    // kiểm tra nếu functionArray không có giá trị thì trả về processedString
    if (!functionExpressArray || functionExpressArray.length === 0) {
        return processedString;
    }
    functionExpressArray.forEach(func => {
        // Tạo regex động dựa trên tên hàm, ví dụ: VND(123) -> /VND\((\d+)\)/g
        const funcName = func.name;
        const regex = new RegExp(`${funcName}\\((.*?)\\)`, 'g');
        processedString = processedString.replace(regex, (match, content) => {
            try {
                return func(content);
            } catch (error) {
                return match;
            }
        });
    });

    return processedString;
}



export default evaluateExpressionsInString;