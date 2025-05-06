function VND(number) {
    if (number === 0) return "Không đồng";

    const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
    const numbers = [
        "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"
    ];

    function convertThreeDigit(num) {
        let result = "";
        const hundred = Math.floor(num / 100);
        const ten = Math.floor((num % 100) / 10);
        const unit = num % 10;

        if (hundred > 0) {
            result += numbers[hundred] + " trăm ";
            if (ten === 0 && unit > 0) {
                result += "lẻ ";
            }
        }

        if (ten > 1) {
            result += numbers[ten] + " mươi ";
            if (unit === 1) {
                result += "mốt ";
            } else if (unit > 0) {
                result += numbers[unit] + " ";
            }
        } else if (ten === 1) {
            result += "mười ";
            if (unit > 0) {
                result += numbers[unit] + " ";
            }
        } else if (unit > 0) {
            result += numbers[unit] + " ";
        }

        return result.trim();
    }

    let result = "";
    let unitIndex = 0;

    while (number > 0) {
        const threeDigits = number % 1000;
        if (threeDigits > 0) {
            let part = convertThreeDigit(threeDigits);
            if (unitIndex > 0) {
                part += " " + units[unitIndex];
            }
            result = part + " " + result;
        }
        number = Math.floor(number / 1000);
        unitIndex++;
    }

    // Viết hoa chữ cái đầu tiên
    result = result.trim() + " đồng";
    return result.charAt(0).toUpperCase() + result.slice(1);
}


// Ví dụ hàm USD (giả định)
function USD(number) {
    // Chuyển đổi số thành chữ tiếng Anh
    const units = ["", "thousand", "million", "billion"];
    const numbers = [
        "zero", "one", "two", "three", "four", "five", 
        "six", "seven", "eight", "nine"
    ];
    
    // ... (triển khai logic tương tự hàm VND nhưng bằng tiếng Anh)
    return convertNumberToWords(number, units, numbers) + " dollars";
}

// Hàm chuyển số thành chữ (có thể dùng chung cho cả VND và USD)
function convertNumberToWords(number, units, numberWords) {
    // ... triển khai logic chuyển đổi
    return "one million two hundred thirty-four thousand five hundred sixty-seven";
}

export { VND, USD };