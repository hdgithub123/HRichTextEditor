import { EditorState, genKey } from 'draft-js';
import { numberOfUniqueRows, findTableIdBlocks } from './ultils';


const changeEditorStateWithRowSpan = async ({ editorState, tableData, tableKey }) => {
    const contentState = editorState.getCurrentContent();
    let blockMap = contentState.getBlockMap();
    const blockMapJS = blockMap.toJS();
    const { data, tableId } = tableData;
    const columnBlocks = findTableIdBlocks({ blockMapJS, tableId });
    const uniqueRows = numberOfUniqueRows({ columnBlocks });
    // Lấy ra tableBlock của blockMap có key = tableKey
    const tableBlock = blockMap.get(tableKey);
    if (tableBlock) {
        // Lấy ra data.tableShape của tableBlock
        const tableShape = tableBlock.getData().get('tableShape');
        // Đi qua từng hàng của tableShape
        tableShape.forEach((rowStructure, rowIndex) => {
            if (uniqueRows.has(rowIndex)) {
                rowStructure.forEach((column, columnIndex) => {
                    if (column.rowspan && column.rowspan > 1) {
                        const numberRowisSpaned = column.rowspan;
                        tableShape[rowIndex][columnIndex].rowspan = 1;
                        // Thay đổi các hàng tiếp theo từ vị trí hàng trước đó đến vị trí hàng trước đó + numberRowSpan - 1
                        let nextRowIndex = 0;
                        for (let i = 1; i < numberRowisSpaned; i++) {
                            nextRowIndex = rowIndex + i;
                            if (tableShape[nextRowIndex]) {
                                tableShape[nextRowIndex][columnIndex] = { columnspan: column.columnspan , rowspan: 1  };
                            }

                            const cellPosition = `${tableKey}-${rowIndex}-${columnIndex}`;
                            const cellBlock = blockMap.find(block => block.getData().get('cellPosition') === cellPosition && block.getType() === 'cellTable');
                            if (cellBlock) {
                              const  newCellPosition = `${tableKey}-${nextRowIndex}-${columnIndex}`;
                                const newBlock = cellBlock.merge({
                                    key: genKey(),
                                    text: cellBlock.getText(),
                                    data: cellBlock.getData().set('cellPosition', newCellPosition)
                                });
                                blockMap = blockMap.set(newBlock.getKey(), newBlock);
                            }
                        }
                    }
                });
            }else{
                // kiểm tra xem rowspan có lớn hơn 1 không nếu có thì xem có bị chồng lên hàng nào thuộc uniqueRows không nếu có thì giảm rowspan về 1
                // gán tất cả các dòng bị merge về  rowspan: 1 và thêm các block mới vào blockMap có text = block cũ và cellPosition có cùng columnspan
                
                    // Kiểm tra xem rowspan có lớn hơn 1 không
                    rowStructure.forEach((column, columnIndex) => {
                        if (column.rowspan && column.rowspan > 1) {
                            const numberRowisSpaned = column.rowspan;
                            let nextRowIndex = 0;
                            for (let i = 1; i < numberRowisSpaned; i++) {
                                nextRowIndex = rowIndex + i;
                               
                                if (uniqueRows.has(nextRowIndex)) {
                                    tableShape[rowIndex][columnIndex].rowspan = 1;
                                    for (let j = 1; j < numberRowisSpaned; j++) {
                                        const resetRowIndex = rowIndex + j;
                                        if (tableShape[resetRowIndex]) {
                                            tableShape[resetRowIndex][columnIndex] = { columnspan: column.columnspan, rowspan: 1 };
                                        }
    
                                        // Lấy block có type = 'cellTable' và cellPosition = tableKey-row-col
                                        const cellPosition = `${tableKey}-${rowIndex}-${columnIndex}`;
                                        const cellBlock = blockMap.find(block => block.getData().get('cellPosition') === cellPosition && block.getType() === 'cellTable');
                                        if (cellBlock) {
                                            // Tạo mới block với key khác và cellPosition mới
                                            const newCellPosition = `${tableKey}-${resetRowIndex}-${columnIndex}`;
                                            const newBlock = cellBlock.merge({
                                                key: genKey(),
                                                text: cellBlock.getText(),
                                                data: cellBlock.getData().set('cellPosition', newCellPosition)
                                            });
                                            blockMap = blockMap.set(newBlock.getKey(), newBlock);
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    });
                }
            });

        // Tạo ContentState mới với blockMap đã cập nhật
        const newContentState = contentState.merge({
            blockMap: blockMap
        });

        // Tạo EditorState mới từ ContentState đã cập nhật
        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'change-block-data' // lý do thay đổi
        );

        return newEditorState;
    }

    return editorState; // Trả về trạng thái cũ nếu không tìm thấy block
};

export default changeEditorStateWithRowSpan;