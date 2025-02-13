import getCellPosition from "./getCellPosition";

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

    blockMap.forEach((block) => {
        if (block === startBlock) {
            isWithinSelection = true;
            const cellPosition = getCellPosition({ block });
            if (cellPosition) {
                tableKey = cellPosition.tableKey;
                cellsPosition.push({ row: cellPosition.row, column: cellPosition.column });
            }
        } else if (isWithinSelection) {
            const cellPosition = getCellPosition({ block });
            if (cellPosition) {
                cellsPosition.push({ row: cellPosition.row, column: cellPosition.column });
            }
        }

        if (block === endBlock) {
            isWithinSelection = false;
        }
    });

    return { tableKey, cellsPosition };
};

export default getCellsPositionOnSelection