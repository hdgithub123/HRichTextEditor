import { EditorState, Modifier, SelectionState } from 'draft-js';
import evaluateExpressionsInString from './evaluateExpressionsInString';
import { VND, USD,EnReadNumber,VnReadNumber } from './functionExpress'; // Import hàm VND từ file functionExpress

const changeExpressionsInString = ({ editorState,functionExpressArray=[VND,USD,EnReadNumber,VnReadNumber] }) => {
    const moreFunctions = functionExpressArray? [VND,USD,EnReadNumber,VnReadNumber,...functionExpressArray]: [VND,USD,EnReadNumber,VnReadNumber];
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    let newContentState = contentState;

    blockMap.forEach((block) => {
        const blockText = block.getText();
        const blockKey = block.getKey();
        const characterList = block.getCharacterList(); // Lấy style từng ký tự

        // Regex để tìm chuỗi có dạng [{*}]
        const regex = /\[\{(.*?)\}\]/g;
        let matches = [];
        let match;

        // Tìm tất cả các chuỗi khớp với regex
        while ((match = regex.exec(blockText)) !== null) {
            matches.push({
                expression: match[1], // Nội dung bên trong [{*}]
                start: match.index,
                end: match.index + match[0].length,
            });
        }

        // Lặp qua các chuỗi khớp từ cuối lên đầu
        for (let i = matches.length - 1; i >= 0; i--) {
            const { expression, start, end } = matches[i];

            // Đánh giá biểu thức bằng hàm evaluateExpressionsInString
            const replacementText = evaluateExpressionsInString({str: expression, functionExpressArray:moreFunctions });

            // Lấy style của ký tự đầu tiên trong chuỗi [{*}]
            const firstCharStyle = characterList.get(start)?.getStyle() || new Set();

            // Tạo selection để thay thế
            const selectionState = SelectionState.createEmpty(blockKey).merge({
                anchorOffset: start,
                focusOffset: end,
            });

            // Thay thế chuỗi [{*}] bằng kết quả của evaluateExpressionsInString
            newContentState = Modifier.replaceText(
                newContentState,
                selectionState,
                replacementText,
                firstCharStyle // Áp dụng style của ký tự đầu tiên
            );
        }
    });

    // Trả về EditorState mới với nội dung đã được thay thế
    return EditorState.push(editorState, newContentState, 'insert-characters');
};

export default changeExpressionsInString;