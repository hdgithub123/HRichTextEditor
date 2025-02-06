import insertCells  from '../cellTable/insertCells';
const getRangeMergecell = ({editorState}) => {
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    // B1: Kiểm tra nếu selection là một điểm duy nhất
    if (!selectionState.isCollapsed()) {
        return null;
    }

    // Lấy block tại vị trí startKey
    const startBlock = contentState.getBlockForKey(startKey);
    if (!startBlock) {
        return null;
    }

    // B2: Kiểm tra nếu block có kiểu cellTable
    if (startBlock.getType() !== 'cellTable') {
        return null;
    }

    // Lấy tableKey từ block tại vị trí selection
    const startBlockData = startBlock.getData().toJS();
    const tableKey = startBlockData.tableKey;
    if (!tableKey) {
        return null;
    }

    // Tìm block tương ứng có key bằng tableKey
    let tableBlock = null;
    for (const block of blockMap.values()) {
        if (block.getKey() === tableKey) {
            tableBlock = block;
            break; // Thoát khỏi vòng lặp khi đã tìm thấy
        }
    }

    if (!tableBlock) {
        return null;
    }

    // Dựa vào data.tableShape để lấy ra colspan và rowspan tương ứng
    const tableShape = tableBlock.getData().get('tableShape');
    const cellPosition = startBlockData.cellPosition.split('-');
    const row = parseInt(cellPosition[1], 10);
    const col = parseInt(cellPosition[2], 10);
    const cellData = tableShape[row][col];

    const colspan = cellData.columnspan || 1;
    const rowspan = cellData.rowspan || 1;

    return {
        tableBlock,
        startPoint: {
            startRow: row,
            startCol: col,
        },
        endPoint: {
            endRow: row + rowspan - 1,
            endCol: col + colspan - 1,
        }
    };
}


const getUnMergeEditorState = (editorState) => {
    const position = getRangeMergecell({editorState});
    if (!position) return null;

    const { tableBlock, startPoint, endPoint } = position;
    if (!tableBlock || !startPoint || !endPoint || endPoint.endRow < startPoint.startRow || endPoint.endCol < startPoint.startCol) {
        return null;
    }

    // Chỉnh sửa lại phần data của tableBlock.data.tableShape
    const tableShape = tableBlock.getData().get('tableShape');
    const cellsData = [];

    for (let row = startPoint.startRow; row <= endPoint.endRow; row++) {
        for (let col = startPoint.startCol; col <= endPoint.endCol; col++) {
            tableShape[row][col] = {
                columnspan: 1,
                rowspan: 1,
            };

            // Tạo dữ liệu cho các ContentBlock mới với text=" " cho các ô được unmerge
            if (!(row === startPoint.startRow && col === startPoint.startCol)) {
                cellsData.push({
                    text: ' ',
                    tableKey: tableBlock.getKey(),
                    cellPosition: `${tableBlock.getKey()}-${row}-${col}`
                });
            }
        }
    }


    let newEditorState = insertCells(editorState, cellsData);
    return newEditorState;
}


const getUnMergecell = ({editorState, onChange}) => {
    const newEditorState = getUnMergeEditorState(editorState);
    if (newEditorState) {
        onChange(newEditorState);
    }
}

export default getUnMergecell;