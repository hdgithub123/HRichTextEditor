// viết 1 hàm để thay đổi giá trị trong phần data.maxHeaderRow của 1 block tableStructure

import { EditorState, Modifier } from 'draft-js';

const changeTablemaxHeadernumber = ({editorState, newMaxHeaderRow}) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    // thêm bước lấy tableKey từ data.tableKey của block hiện tại có type = cellTable
    let tableKey = null;
    for (const block of blockMap.values()) {
        if (block.getType() === 'cellTable') {
            tableKey = block.getData().get('tableKey');
            break; // Thoát khỏi vòng lặp khi đã tìm thấy
        }
    }

    if (!tableKey) return editorState;

    // Tìm block tương ứng có key bằng tableKey
    let tableBlock = null;
    for (const block of blockMap.values()) {
        if (block.getKey() === tableKey) {
            tableBlock = block;
            break; // Thoát khỏi vòng lặp khi đã tìm thấy
        }
    }

    if (!tableBlock) return editorState;

    // Cập nhật giá trị maxHeaderRow trong data của tableBlock
    const newTableBlockData = tableBlock.getData().set('maxHeaderRow', newMaxHeaderRow);
    const newTableBlock = tableBlock.set('data', newTableBlockData);

    // tạo 1 data mới bằng cách lấy data cũ rổi chỉn sửa maxHeaderRow sau đó đưa data mới vào thay data cũ
    


    // Cập nhật editorState với tableBlock mới
    const newBlockMap = blockMap.set(newTableBlock.getKey(), newTableBlock);
    const newContentState = contentState.set('blockMap', newBlockMap);
    const newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');

    return newEditorState;
};

export default changeTablemaxHeadernumber;