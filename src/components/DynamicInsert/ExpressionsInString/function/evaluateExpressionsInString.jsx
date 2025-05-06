import { evaluate } from "mathjs"; // Import mathjs để tính toán đúng
import {VND, USD} from "./functionExpress"; // Import hàm VND từ file functionExpress

function evaluateExpressionsInString({str, functionArray = [VND]}) {
    // Bước 1: Xử lý các biểu thức toán học trong []
    let processedString = str.replace(/\[([^\[\]]+)\]/g, (match, expression) => {
        try {
            return evaluate(expression).toString();
        } catch (error) {
            return match;
        }
    });

    // Bước 2: Xử lý các hàm tùy chỉnh trong functionArray
    // kiểm tra nếu functionArray không có giá trị thì trả về processedString
    if (!functionArray || functionArray.length === 0) {
        return processedString;
    }
    functionArray.forEach(func => {
        // Tạo regex động dựa trên tên hàm, ví dụ: VND(123) -> /VND\((\d+)\)/g
        const funcName = func.name;
        const regex = new RegExp(`${funcName}\\((\\d+)\\)`, 'g');
        
        processedString = processedString.replace(regex, (match, number) => {
            try {
                return func(parseInt(number, 10));
            } catch (error) {
                return match;
            }
        });
    });

    return processedString;
}



export default evaluateExpressionsInString;