const numberOfUniqueRows = ({ columnBlocks }) => {
    const uniqueRows = new Set();
    columnBlocks.forEach((block) => {
        const cellPosition = block.data.cellPosition;
        if (cellPosition) {
            const [, row] = cellPosition.split('-');
            uniqueRows.add(parseInt(row, 10));
        }
    });

    return uniqueRows;
};




const findTableIdBlocks = ({ blockMapJS, tableId }) => {
    const columnBlocks = [];

    Object.values(blockMapJS).forEach(block => {
        if (block && block.text && block.type) {
            // Kiểm tra nếu text chứa {{tableId và kết thúc bằng }}
            const startIndex = block.text.indexOf(`{{${tableId}.`);
            const endIndex = block.text.indexOf('}}', startIndex);
            if (startIndex !== -1 && endIndex !== -1 && block.type === "cellTable") {
                columnBlocks.push(block);
            }
        }
    });
    return columnBlocks;
};


export { numberOfUniqueRows, findTableIdBlocks };