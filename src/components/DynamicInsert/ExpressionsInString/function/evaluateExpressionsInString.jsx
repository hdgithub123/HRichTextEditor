import { evaluate } from "mathjs"; // Import mathjs để tính toán đúng
import { formatNumber, formatVnNumber, formatUsNumber, roundNumber } from "./fomatNumber";
import { VND, USD } from "./functionExpress"; // Import hàm VND từ file functionExpress

function evaluateExpressionsInString({ str, dynamicFormats = [], dynamicFunctions = [VND] }) {
    // Bước 1: Xử lý các biểu thức toán học trong []
    let processedString = str.replace(/\[([^\[\]]+)\]/g, (match, expression) => {
        try {
            return evaluate(expression).toString();
        } catch (error) {
            return match;
        }
    });

    // const functionFomatNumberArray = [formatNumber, formatVnNumber, formatUsNumber,roundNumber,...dynamicFormats];
    const defaultFormatFuncs = [formatNumber, formatVnNumber, formatUsNumber, roundNumber];
    const defaultFormatNames = defaultFormatFuncs.map(fn => fn.name);

    // Lọc dynamicFormats để loại bỏ các hàm trùng tên
   const filteredDynamicFormats = Array.isArray(dynamicFormats) && dynamicFormats.some(fn => typeof fn === "function")
    ? dynamicFormats.filter(fn => typeof fn === "function" && !defaultFormatNames.includes(fn.name))
    : [];

    const functionFomatNumberArray = [...defaultFormatFuncs, ...filteredDynamicFormats];

    // Bước 1.5: Xử lý các hàm định dạng số
    if (functionFomatNumberArray && functionFomatNumberArray.length > 0) {
        functionFomatNumberArray.forEach(formatFunc => {
            const funcName = formatFunc.name;
            // Regex cho pattern như formatNumber(number,1) hoặc formatNumber(number)
            const regex = new RegExp(`${funcName}\\((-?[\\d]+[\\.,]?[\\d]*)(?:,\\s*(-?[\\d]+))?\\)`, 'g');
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
    if (!dynamicFunctions || dynamicFunctions.length === 0) {
        return processedString;
    }
    dynamicFunctions.forEach(func => {
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