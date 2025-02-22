import { EditorState } from 'draft-js';
import getSelectedRow from './getSelectedRow';

const deleteRow = ({editorState, onChange}) => {
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

    const maxHeaderRow = tableBlock.getData().get('maxHeaderRow');
    // nếu selectedRow có row = maxHeaderRow -1 thì kiểm tra xem tại row = maxHeaderRow 
    // nếu toàn bộ các hàng row = maxHeaderRow mà có rowspan >1 thì trả ra editorState
    if (row === maxHeaderRow - 1) {
        const tableShape = tableBlock.getData().get('tableShape');
        const headerRow = tableShape[maxHeaderRow];
        const hasMergedCells = headerRow.some(cell => cell.rowspan > 1);
       
        if (hasMergedCells) {
            console.log("Cannot delete row because the next header row has merged cells.");
            return editorState;
        }
    }

    // Lấy tableShape từ data của tableBlock
    let tableShape = tableBlock.getData().get('tableShape');
    // Kiểm tra nếu có ô nào bị rowspan > 1 thì bỏ qua
    for (let col = 0; col < tableShape[row].length; col++) {
        if (!('rowspan' in tableShape[row][col]) || tableShape[row][col].rowspan > 1) {
            console.log("Can't delete row because have merge cell");
            alert("Can't delete row because have merge cell");
            return editorState;
        } 
    }

    if (tableShape.length === 1) {
        // Nếu chỉ còn 1 hàng thì xóa luôn table
        let newBlockMap = blockMap.delete(tableBlock.getKey());
        let newContentState = contentState.set('blockMap', newBlockMap);
        // xóa luôn các block có data.tableKey === tableKey
        blockMap.forEach((block) => {
            if (block.getData().get('tableKey') === tableKey) {
                newBlockMap = newBlockMap.delete(block.getKey());
            }
        });
        newContentState = newContentState.set('blockMap', newBlockMap);
        let newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');
        onChange(newEditorState);
        return;
    }


    // Xóa hàng trong tableShape
    tableShape.splice(row, 1);

    // Cập nhật tableBlock với tableShape mới
    const newTableBlock = tableBlock.set('data', tableBlock.getData().set('tableShape', tableShape));

    // Cập nhật editorState với tableBlock mới
    let newBlockMap = blockMap.set(newTableBlock.getKey(), newTableBlock);
    let newContentState = contentState.set('blockMap', newBlockMap);
    let newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');

    // Xóa các block có cellPosition mà row = row của selection
    newBlockMap.forEach((block) => {
        const blockData = block.getData().toJS();
        if (blockData.tableKey === tableKey) {
            const cellPosition = blockData.cellPosition.split('-');
            const cellRow = parseInt(cellPosition[1], 10);
            const col = parseInt(cellPosition[2], 10);

            if (cellRow === row) {
                newBlockMap = newBlockMap.delete(block.getKey());
            } else if (cellRow > row) {
                const newCellPosition = `${tableKey}-${cellRow - 1}-${col}`;
                const newBlockData = block.getData().set('cellPosition', newCellPosition);
                const newBlock = block.set('data', newBlockData);
                newBlockMap = newBlockMap.set(newBlock.getKey(), newBlock);
            }
        }
    });

    newContentState = newContentState.set('blockMap', newBlockMap);
    newEditorState = EditorState.push(newEditorState, newContentState, 'change-block-data');
    onChange(newEditorState);    
}

export default deleteRow;