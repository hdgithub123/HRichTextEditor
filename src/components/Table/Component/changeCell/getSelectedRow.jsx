const getSelectedRow = (editorState) => {
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const contentState = editorState.getCurrentContent();

    // Lấy block tại vị trí startKey
    const startBlock = contentState.getBlockForKey(startKey);
    if (!startBlock) {
        return null;
    }

    // Kiểm tra nếu block có kiểu cellTable
    if (startBlock.getType() !== 'cellTable') {
        return null;
    }

    // Lấy tableKey từ block tại vị trí selection
    const startBlockData = startBlock.getData().toJS();
    const tableKey = startBlockData.tableKey;
    if (!tableKey) {
        return null;
    }

    // Lấy vị trí hàng từ cellPosition
    const cellPosition = startBlockData.cellPosition.split('-');
    const row = parseInt(cellPosition[1], 10);

    return { tableKey, row };
}

export default getSelectedRow;