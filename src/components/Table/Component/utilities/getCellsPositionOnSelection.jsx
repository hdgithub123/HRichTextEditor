import getCellPosition from "./getCellPosition";

// const getCellsPositionOnSelection = ({ editorState }) => {
//     const selectionState = editorState.getSelection();
//     const contentState = editorState.getCurrentContent();
//     const blockMap = contentState.getBlockMap();

//     const startKey = selectionState.getStartKey();
//     const endKey = selectionState.getEndKey();
//     const startBlock = contentState.getBlockForKey(startKey);
//     const endBlock = contentState.getBlockForKey(endKey);

//     // Kiểm tra nếu startBlock không phải là cellTable
//     if (startBlock.getType() !== 'cellTable') {
//         return { tableKey: null, cellsPosition: [] };
//     }


//     let isWithinSelection = false;
//     const cellsPosition = [];
//     let tableKey = null;

//     blockMap.forEach((block) => {
//         if (block === startBlock) {
//             isWithinSelection = true;
//             const cellPosition = getCellPosition({ block });
//             if (cellPosition) {
//                 tableKey = cellPosition.tableKey;
//                 cellsPosition.push({ row: cellPosition.row, column: cellPosition.column });
//             }
//         } else if (isWithinSelection) {
//             const cellPosition = getCellPosition({ block });
//             if (cellPosition) {
//                 cellsPosition.push({ row: cellPosition.row, column: cellPosition.column });
//             }
//         }

//         if (block === endBlock) {
//             isWithinSelection = false;
//         }
//     });

//     return { tableKey, cellsPosition };
// };

// export default getCellsPositionOnSelection



const getCellsPositionOnSelection = ({ editorState }) => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();
    const startBlock = contentState.getBlockForKey(startKey);
    const endBlock = contentState.getBlockForKey(endKey);

    // Kiểm tra nếu startBlock không phải là cellTable
    if (startBlock.getType() !== 'cellTable') {
        return { tableKey: null, cellsPosition: [] };
    }

    let isWithinSelection = false;
    const cellsPosition = [];
    let tableKey = null;

    const startCellPosition = getCellPosition({ block: startBlock });
    const endCellPosition = getCellPosition({ block: endBlock });

    blockMap.forEach((block) => {
        const cellPosition = getCellPosition({ block });

        if (!cellPosition) {
            return;
        }

        const { row, column } = cellPosition;

        // Kiểm tra các điều kiện để loại bỏ block không nằm trong phạm vi lựa chọn
        if (
            (startCellPosition.row > endCellPosition.row) ||
            (startCellPosition.column > endCellPosition.column) ||
            (row < startCellPosition.row) ||
            (column < startCellPosition.column) ||
            (column > endCellPosition.column) ||
            (row > endCellPosition.row)
        ) {
            return;
        }

        if (block === startBlock) {
            isWithinSelection = true;
            tableKey = cellPosition.tableKey;
            cellsPosition.push({ row, column });
        } else if (isWithinSelection) {
            cellsPosition.push({ row, column });
        }

        if (block === endBlock) {
            isWithinSelection = false;
        }
    });

    return { tableKey, cellsPosition };
};

export default getCellsPositionOnSelection;