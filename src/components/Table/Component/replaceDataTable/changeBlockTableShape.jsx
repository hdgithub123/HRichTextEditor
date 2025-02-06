import { EditorState } from 'draft-js';
import { numberOfUniqueRows, findTableIdBlocks } from './ultils';
import { Map } from 'immutable';

//xong  thay doi Table Shape-------------------------------------
const changeBlockTableShape =  ({ editorState, tableData, tableKey }) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    const blockMapJS = blockMap.toJS();
    const newTableShape = chageTableShape({ blockMapJS, tableData, tableKey });
    const newEditorState = replaceBlockTableShape({ editorState, blockKey: tableKey, newTableShape });

    return newEditorState;
}


const chageTableShape = ({ blockMapJS, tableData, tableKey }) => {
    const { data, tableId } = tableData;
    const numberRow = data.length;
    // lấy ra block của TableKey trong blockMap
    const tableBlock = blockMapJS[tableKey];
    // lấy ra data.tableShape của tableBlock
    const tableShape = tableBlock.data.tableShape
    const columnBlocks = findTableIdBlocks({ blockMapJS, tableId });
    const uniqueRows = numberOfUniqueRows({ columnBlocks });
    const newTableShape = copyTableShape({ tableShape, numberOfUniqueRows: uniqueRows, numberRowcopy: numberRow });
    return newTableShape;
};


const copyTableShape = ({ tableShape, numberOfUniqueRows, numberRowcopy }) => {
    const newTableShape = [];
    tableShape.forEach((rowStructure, rowIndex) => {
        if (numberOfUniqueRows.has(rowIndex) === true) {

            // Nếu hàng nằm trong numberOfUniqueRows, lặp lại numberRowcopy lần
            for (let i = 0; i < numberRowcopy; i++) {
                newTableShape.push([...rowStructure]);
            }
        } else {
            // Nếu hàng không nằm trong numberOfUniqueRows, chỉ lấy 1 lần
            newTableShape.push([...rowStructure]);
        }
    });

    return newTableShape;
};

const replaceBlockTableShape = ({ editorState, blockKey, newTableShape }) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    const block = blockMap.get(blockKey);

    if (block) {
        // Lấy phần data hiện tại của block và thay thế tableShape
        const blockData = block.getData().toJS();
        blockData.tableShape = newTableShape;

        // Tạo block mới với dữ liệu đã thay thế
        const newBlock = block.merge({
            data: Map(blockData)
        });

        // Thay thế block trong blockMap
        const newBlockMap = blockMap.set(blockKey, newBlock);

        // Tạo ContentState mới với blockMap đã cập nhật
        const newContentState = contentState.merge({
            blockMap: newBlockMap
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


export default changeBlockTableShape;