import { EditorState, ContentBlock, genKey } from 'draft-js';
import { Map } from 'immutable';
import getSelectedColumn from './getSelectedColumn';


const insertLeftColumn = ({editorState, onChange}) => {
    const selectedColumn = getSelectedColumn(editorState);
    if (!selectedColumn) return editorState;

    const { tableKey, col } = selectedColumn;
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    // Tìm block tương ứng có key bằng tableKey
    let tableBlock = null;
    for (const block of blockMap.values()) {
        if (block.getKey() === tableKey) {
            tableBlock = block;
            break; // Thoát khỏi vòng lặp khi đã tìm thấy
        }
    }

    if (!tableBlock) return editorState;

    // Lấy tableShape từ data của tableBlock
    let tableShape = tableBlock.getData().get('tableShape');

        // Kiểm tra nếu có ô nào bị columnspan > 1 thì bỏ qua
        for (let row = 0; row < tableShape.length; row++) {
            if (!('columnspan' in tableShape[row][col]) || tableShape[row][col].columnspan > 1) {
                if (col !== 0) {
                    if (!('columnspan' in tableShape[row][col-1]) || tableShape[row][col-1].columnspan > 1) {
                        console.log("Can't insert column because previous have merge cell");
                        return editorState;
                    } 
                }
            }
        }


    // Chèn cột mới vào bên trái của cột được chọn
    for (let row = 0; row < tableShape.length; row++) {
        tableShape[row].splice(col, 0, { columnspan: 1, rowspan: 1 });
    }

    // Cập nhật tableBlock với tableShape mới
    const newTableBlock = tableBlock.set('data', tableBlock.getData().set('tableShape', tableShape));

    // Cập nhật editorState với tableBlock mới
    let newBlockMap = blockMap.set(newTableBlock.getKey(), newTableBlock);
    let newContentState = contentState.set('blockMap', newBlockMap);
    let newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');

    // Cập nhật lại tất cả các cell block liên quan
    newBlockMap.forEach((block) => {
        const blockData = block.getData().toJS();
        if (blockData.tableKey === tableKey) {
            const cellPosition = blockData.cellPosition.split('-');
            const row = parseInt(cellPosition[1], 10);
            const cellCol = parseInt(cellPosition[2], 10);

            if (cellCol >= col) {
                const newCellPosition = `${tableKey}-${row}-${cellCol + 1}`;
                const newBlockData = block.getData().set('cellPosition', newCellPosition);
                const newBlock = block.set('data', newBlockData);
                newBlockMap = newBlockMap.set(newBlock.getKey(), newBlock);
            }
        }
    });

    // Tạo các block mới cho cột mới
    for (let row = 0; row < tableShape.length; row++) {
        const newBlock = new ContentBlock({
            key: genKey(),
            type: 'cellTable',
            text: ' ',
            data: Map({
                tableKey: tableKey,
                cellPosition: `${tableKey}-${row}-${col}`
            })
        });
        newBlockMap = newBlockMap.set(newBlock.getKey(), newBlock);
    }

    newContentState = newContentState.set('blockMap', newBlockMap);
    newEditorState = EditorState.push(newEditorState, newContentState, 'change-block-data');
    onChange(newEditorState);
}

export default insertLeftColumn;