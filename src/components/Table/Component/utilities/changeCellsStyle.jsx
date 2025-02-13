import {EditorState} from 'draft-js'

const changeCellsStyle = ({ editorState, cellsPosition, newStyle}) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    // Tìm block tương ứng có key bằng tableKey
    let tableBlock = null;
    for (const block of blockMap.values()) {
        if (block.getKey() === cellsPosition.tableKey) {
            tableBlock = block;
            break; // Thoát khỏi vòng lặp khi đã tìm thấy
        }
    }

    if (!tableBlock) return editorState;

    // Lấy tableShape từ data của tableBlock
    let tableShape = tableBlock.getData().get('tableShape');
    if (!tableShape){
        return editorState
    }


    // Thay đổi thông tin individualStyle trong đúng vị trí của data.tableShape
    cellsPosition.cellsPosition.forEach(({ row, column }) => {
        const cell = tableShape[row][column];
        cell.individualStyle = { ...cell.individualStyle, ...newStyle };
    });

    // Cập nhật tableBlock với tableShape mới
    const newTableBlock = tableBlock.set('data', tableBlock.getData().set('tableShape', tableShape));

    // Cập nhật editorState với tableBlock mới
    let newBlockMap = blockMap.set(newTableBlock.getKey(), newTableBlock);
    let newContentState = contentState.set('blockMap', newBlockMap);
    let newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');

    return newEditorState;
};

export default changeCellsStyle;