import { EditorState } from 'draft-js';


const getPositioncell = (editorState) => {
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    let firstTableKey = null;
    let endTableKey = null;

    // Lấy block tại vị trí startKey
    const startBlock = contentState.getBlockForKey(startKey);
    const endBlock = contentState.getBlockForKey(endKey);
    if (startBlock && endBlock) {
        const startBlockData = startBlock.getData().toJS();
        firstTableKey = startBlockData.tableKey;
        const endBlockData = endBlock.getData().toJS();
        endTableKey = endBlockData.tableKey;
        if (!firstTableKey || !endTableKey || firstTableKey !== endTableKey) {
            return null;
        } else {
            // lay ra startRow, startCol, endRow, endCol
            const startCellPosition = startBlockData.cellPosition.split('-');
            const endCellPosition = endBlockData.cellPosition.split('-');
            const startRow = parseInt(startCellPosition[1], 10);
            const startCol = parseInt(startCellPosition[2], 10);
            const endRow = parseInt(endCellPosition[1], 10);
            const endCol = parseInt(endCellPosition[2], 10);
            let tableBlock = null;
            for (const block of blockMap.values()) {
                if (block.getKey() === firstTableKey) {
                    tableBlock = block;
                    break; // Thoát khỏi vòng lặp khi đã tìm thấy
                }
            }

            return {
                tableBlock,
                startPoint: {
                    startRow,
                    startCol,
                },
                endPoint: {
                    endRow,
                    endCol,
                }
            };
        }
    }


}


const getMergeEditorState = (editorState) => {
    const position = getPositioncell(editorState);
    if (!position) return null;

    const { tableBlock, startPoint, endPoint } = position;
    if (!tableBlock || !startPoint || !endPoint || endPoint.endRow < startPoint.startRow || endPoint.endCol < startPoint.startCol) {
        return null;
    }

    const mergeCells = {
        row: endPoint.endRow - startPoint.startRow + 1,
        col: endPoint.endCol - startPoint.startCol + 1,
    }

    let tableShape = tableBlock.getData().get('tableShape');
    // muon merge cell thi phai co columnspan va rowspan deu = 1

    for (let row = startPoint.startRow; row <= endPoint.endRow; row++) {
        for (let col = startPoint.startCol; col <= endPoint.endCol; col++) {
            if (!('columnspan' in tableShape[row][col]) || !('rowspan' in tableShape[row][col])) {
                console.log("Cannot merge the cell because the range already contains a merged cell.")
                return editorState;
            }
            if (tableShape[row][col].columnspan > 1 || tableShape[row][col].rowspan > 1) {
                console.log("Cannot merge the cell because the range already contains a merged cell.")
                return editorState;
            }
        }
    }

    for (let row = startPoint.startRow; row <= endPoint.endRow; row++) {
        for (let col = startPoint.startCol; col <= endPoint.endCol; col++) {
            if (row === startPoint.startRow && col === startPoint.startCol) {
                tableShape[row][col] = {
                    columnspan: mergeCells.col,
                    rowspan: mergeCells.row,
                };
            } else {
                tableShape[row][col] = {};
            }
        }
    }

    // Cập nhật tableBlock với tableShape mới
    const newTableBlock = tableBlock.set('data', tableBlock.getData().set('tableShape', tableShape));

    // Cập nhật editorState với tableBlock mới
    const contentState = editorState.getCurrentContent();
    let newBlockMap = contentState.getBlockMap().set(newTableBlock.getKey(), newTableBlock);

    newBlockMap.forEach((block) => {
        const blockData = block.getData().toJS();
        if (blockData.tableKey === tableBlock.getKey()) {
            const cellPosition = blockData.cellPosition.split('-');
            const row = parseInt(cellPosition[1], 10);
            const col = parseInt(cellPosition[2], 10);

            if ((row >= startPoint.startRow && row <= endPoint.endRow) && (col >= startPoint.startCol && col <= endPoint.endCol)) {
                if(!(row === startPoint.startRow && col === startPoint.startCol)) {
                    newBlockMap = newBlockMap.delete(block.getKey());    
                }
            }
        }
    });

    const newContentState = contentState.set('blockMap', newBlockMap);
    const newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');
    return newEditorState;
}

const getMergecell = ({editorState, onChange}) => {
    const newEditorState = getMergeEditorState(editorState);
    if (newEditorState) {
        onChange(newEditorState);
    }
}

export default getMergecell;