import { EditorState, ContentBlock, genKey } from 'draft-js';
import { Map } from 'immutable';
import getSelectedRow from './getSelectedRow';

const insertAfterRow = ({editorState, onChange}) => {
    const selectedRow = getSelectedRow(editorState);
    if (!selectedRow) return editorState;

    const { tableKey, row } = selectedRow;
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

    // Kiểm tra nếu có ô nào bị rowspan > 1 thì bỏ qua
    for (let col = 0; col < tableShape[row].length; col++) {
        if (!('rowspan' in tableShape[row][col]) || tableShape[row][col].rowspan > 1) {
            if (row !== tableShape.length - 1) {
                if (!('rowspan' in tableShape[row + 1][col]) || tableShape[row + 1][col].rowspan > 1) {
                    console.log("Can't insert row because next have merge cell");
                    return editorState;
                }
            }
        }
    }

    // Chèn hàng mới vào phía sau của hàng được chọn
    const newRow = tableShape[row].map(() => ({ columnspan: 1, rowspan: 1 }));
    tableShape.splice(row + 1, 0, newRow);

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
            const cellRow = parseInt(cellPosition[1], 10);
            const col = parseInt(cellPosition[2], 10);

            if (cellRow > row) {
                const newCellPosition = `${tableKey}-${cellRow + 1}-${col}`;
                const newBlockData = block.getData().set('cellPosition', newCellPosition);
                const newBlock = block.set('data', newBlockData);
                newBlockMap = newBlockMap.set(newBlock.getKey(), newBlock);
            }
        }
    });

    // Tạo các block mới cho hàng mới
    for (let col = 0; col < tableShape[row].length; col++) {
        const newBlock = new ContentBlock({
            key: genKey(),
            type: 'cellTable',
            text: ' ',
            data: Map({
                tableKey: tableKey,
                cellPosition: `${tableKey}-${row + 1}-${col}`
            })
        });
        newBlockMap = newBlockMap.set(newBlock.getKey(), newBlock);
    }

    newContentState = newContentState.set('blockMap', newBlockMap);
    newEditorState = EditorState.push(newEditorState, newContentState, 'change-block-data');
    onChange(newEditorState);
}

export default insertAfterRow;