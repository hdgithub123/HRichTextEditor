function VND(numberSring) {
    return VnReadNumber(numberSring) ? VnReadNumber(numberSring) + " đồng" : null;
}


function VnReadNumber(number) {
    // Handle invalid input
    if (number === null || number === undefined || number === '') return null;

    // Check for comma (invalid in Vietnamese number format)
    if (typeof number === 'string' && number.includes(',')) return null;

    // Convert input to number, accepting decimal points
    const num = typeof number === 'string' ? parseFloat(number.replace(/\s/g, '')) : number;

    // Validate number
    if (isNaN(num) || !isFinite(num)) return null;

    // nếu chuỗi n có độ dài lớn hơn 31 thì không thể chuyển đổi thành số nguyên an toàn
    if (number.length > 31) {
        return null;
    }
    if (num === 0) return "Không";

    // Handle negative numbers
    const isNegative = num < 0;

    // Split integer and decimal parts
    const parts = number.toString().split('.');
    const integerPart = parts[0]
    const decimalPart = parts[1] || '';

    // Read integer part
    let result = readInteger(integerPart);

    // Read decimal part if present
    if (decimalPart) {
        result += " phẩy " + readDecimal(decimalPart);
    }

    // Add negative prefix if needed
    if (isNegative) {
        result = "Âm " + result;
    }

    // Capitalize first letter
    return result.charAt(0).toUpperCase() + result.slice(1);

    // Function to read integer part
    function readInteger(n) {
        if (n === 0) return "không";

        const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ", "tỷ tỷ", "nghìn tỷ tỷ", "triệu tỷ tỷ", "tỷ tỷ tỷ"];
        const numbers = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
        let result = "";
        let chunks = [];


        // Chuyển n thành chuỗi
        const nStr = n.toString();
        for (let i = nStr.length; i > 0; i -= 3) {
            const start = Math.max(0, i - 3); // Đảm bảo không vượt quá đầu chuỗi
            chunks.push(nStr.substring(start, i));
        }

        // Process chunks from highest to lowest
        for (let i = chunks.length - 1; i >= 0; i--) {
            if (chunks[i] > 0) {
                const chunkText = convertThreeDigits(chunks[i]);
                result += chunkText + (i > 0 ? " " + units[i] : "") + (result ? " " : " ");
            }
        }

        return result.trim();

        // Convert a three-digit number to words

        function convertThreeDigits(num) {
            const hundred = Math.floor(num / 100);
            const ten = Math.floor((num % 100) / 10);
            const unit = num % 10;
            let text = "";

            // Hàng trăm
            if (hundred > 0) {
                text += numbers[hundred] + " trăm";
            }

            // Hàng chục và đơn vị
            if (ten > 0 || unit > 0) {
                if (hundred > 0) text += " ";

                if (ten === 0) {
                    // Trường hợp hàng đơn vị đứng riêng
                    if (hundred > 0 && unit > 0) {
                        text += "lẻ " + (unit === 1 ? "một" : numbers[unit]);
                    } else {
                        text += (unit === 1 ? "một" : numbers[unit]);
                    }
                } else if (ten === 1) {
                    text += "mười";
                    if (unit > 0) {
                        text += " " + (unit === 1 ? "một" : numbers[unit]);
                    }
                } else {
                    text += numbers[ten] + " mươi";
                    if (unit > 0) {
                        // Chỉ dùng "mốt" khi có hàng chục > 1
                        text += " " + (unit === 1 ? "mốt" : unit === 5 ? "lăm" : numbers[unit]);
                    }
                }
            }

            return text.trim();
        }
    }

    // Function to read decimal part (digit by digit)
    function readDecimal(decimalStr) {
        const numbers = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
        let result = "";

        for (let i = 0; i < decimalStr.length; i++) {
            const digit = parseInt(decimalStr[i], 10);
            if (!isNaN(digit)) {
                result += numbers[digit] + " ";
            }
        }

        return result.trim();
    }
}




function EnReadNumber(number) {
    // Check for comma as decimal separator
    if (typeof number === 'string' && number.includes(",")) return null;

    // Convert to number
    const num = typeof number === 'string' ? parseFloat(number) : number;

    // Validate
    if (isNaN(num)) return null;
    if (num === 0) return "Zero";

    // Handle negative numbers
    const isNegative = num < 0;
    const absoluteNum = Math.abs(num);

    // Split into integer and decimal parts
    const parts = absoluteNum.toString().split('.');
    const integerPart = parseInt(parts[0]);
    const decimalPart = parts[1] || '';

    // Read integer part
    let result = readInteger(integerPart);

    // Read decimal part if exists
    if (decimalPart) {
        result += " point " + readDecimal(decimalPart);
    }

    // Add negative prefix
    if (isNegative) {
        result = "Negative " + result;
    }

    // Capitalize first letter
    return result.charAt(0).toUpperCase() + result.slice(1);

    // Helper function to read integer part
    function readInteger(n) {
        if (n === 0) return "zero";

        const scales = ["", "thousand", "million", "billion", "trillion", "quadrillion"];
        const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

        let result = "";
        let scaleIndex = 0;

        while (n > 0) {
            const chunk = n % 1000;
            if (chunk > 0) {
                let chunkText = convertThreeDigits(chunk);
                if (scaleIndex > 0) {
                    chunkText += " " + scales[scaleIndex];
                }
                result = chunkText + " " + result;
            }
            n = Math.floor(n / 1000);
            scaleIndex++;
        }

        return result.trim();

        function convertThreeDigits(num) {
            const hundred = Math.floor(num / 100);
            const ten = Math.floor((num % 100) / 10);
            const unit = num % 10;

            let text = "";

            // Hundreds place
            if (hundred > 0) {
                text += ones[hundred] + " hundred ";
            }

            // Tens and units place
            if (ten > 1) {
                text += tens[ten];
                if (unit > 0) {
                    text += "-" + ones[unit];
                }
            } else if (ten === 1) {
                text += teens[unit];
            } else if (unit > 0) {
                text += ones[unit];
            }

            return text.trim();
        }
    }

    // Helper function to read decimal digits
    function readDecimal(decimalStr) {
        const digitNames = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        let result = "";

        for (let i = 0; i < decimalStr.length; i++) {
            const digit = parseInt(decimalStr[i]);
            if (!isNaN(digit)) {
                result += digitNames[digit] + " ";
            }
        }

        return result.trim();
    }
}



function USD(number) {
    // Check input type and format
    if (typeof number === 'string' && number.includes(",")) return null;

    // Convert to number
    const num = typeof number === 'string' ? parseFloat(number) : number;

    // Check if number exceeds safe integer limits
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        return null;
    }
    // nếu chuỗi n có độ dài lớn hơn 15 thì không thể chuyển đổi thành số nguyên an toàn
    if (number.length > 15) {
        return null;
    }


    // Validate input
    if (isNaN(num)) return "Invalid amount";
    if (num === 0) return "Zero dollars";

    // Handle negative numbers
    const isNegative = num < 0;
    const absoluteNum = Math.abs(num);

    // Split into dollars and cents (always 2 decimal places)
    const parts = absoluteNum.toFixed(2).split('.');
    const dollars = parseInt(parts[0]);
    const cents = parseInt(parts[1]);

    // Build the result
    let result = "";

    // 1. Read dollar amount
    if (dollars > 0) {
        result += readNumber(dollars) + (dollars === 1 ? " dollar" : " dollars");
    }

    // 2. Read cents amount
    if (cents > 0) {
        if (dollars > 0) {
            result += " and ";
        }
        result += readNumber(cents) + (cents === 1 ? " cent" : " cents");
    }

    // Handle zero case (should be caught above)
    if (result === "") {
        result = "Zero dollars";
    }

    // Add negative prefix if needed
    if (isNegative) {
        result = "Negative " + result;
    }

    // Capitalize first letter
    return result.charAt(0).toUpperCase() + result.slice(1);

    // Helper function to read any number (dollars or cents)
    function readNumber(n) {
        if (n === 0) return "zero";

        const scales = ["", "thousand", "million", "billion", "trillion"];
        const ones = ["", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine"];
        const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen",
            "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        const tens = ["", "ten", "twenty", "thirty", "forty", "fifty",
            "sixty", "seventy", "eighty", "ninety"];

        let result = "";
        let scaleIndex = 0;

        while (n > 0) {
            const chunk = n % 1000;
            if (chunk > 0) {
                let chunkText = "";
                const hundred = Math.floor(chunk / 100);
                const ten = Math.floor((chunk % 100) / 10);
                const unit = chunk % 10;

                // Hundreds place
                if (hundred > 0) {
                    chunkText += ones[hundred] + " hundred ";
                }

                // Tens and units place
                if (ten > 1) {
                    chunkText += tens[ten];
                    if (unit > 0) {
                        chunkText += "-" + ones[unit];
                    }
                } else if (ten === 1) {
                    chunkText += teens[unit];
                } else if (unit > 0) {
                    chunkText += ones[unit];
                }

                // Add scale if needed
                if (scaleIndex > 0) {
                    chunkText += " " + scales[scaleIndex];
                }

                result = chunkText + " " + result;
            }
            n = Math.floor(n / 1000);
            scaleIndex++;
        }

        return result.trim();
    }
}

export { VND, USD, EnReadNumber, VnReadNumber };