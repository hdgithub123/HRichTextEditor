// const deleteTableEmpty = ({editorState}) => {
//     // lấy blocks của editorState
//     // lấy ra tất cả các blockKey có type là tableStructure gọi là arraytableStructureKey
//     // đi qua tất cả các block lần 2 kiểm tra xem có phải cellTable không
//     // nếu là cellTable thì kiểm tra xem lấy thuộc tính data.tableKey có thuộc 1 trong số arraytableStructureKey đã lấy ra không
//     // nếu phải thì lưu lại thành 1 danh sách gọi là cellTableKey. nếu không thì sẽ xóa block đó đi khỏi Blocks
//     // sau khi kết thúc lặp qua tất cả các block. lặp qua các arraytableStructureKey xem có thuộc 1 trong số cellTableKey không
//     // nếu ko thuộc thì xóa bỏ block có key vừa kiểm tra khỏi Blocks



//     return newEditorState
   
// }

// export default deleteTableEmpty


import { EditorState, Modifier, ContentState } from 'draft-js';

const deleteTableEmpty = ({ editorState }) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    // Lấy ra tất cả các blockKey có type là tableStructure
    const arraytableStructureKey = blockMap
        .filter(block => block.getType() === 'tableStructure')
        .keySeq()
        .toArray();

    // Lưu lại danh sách các cellTableKey
    const cellTableKeySet = new Set();

    // Đi qua tất cả các blocks lần thứ hai
    const newBlockMap = blockMap.filter(block => {
        if (block.getType() === 'cellTable') {
            const tableKey = block.getData().get('tableKey');
            if (arraytableStructureKey.includes(tableKey)) {
                // cellTableKey.push(block.getKey());
                cellTableKeySet.add(tableKey);
                return true;
            }
            return false;
        }
        return true;
    });
    const cellTableKey = Array.from(cellTableKeySet);
    // Lặp qua các arraytableStructureKey xem có thuộc một trong số cellTableKey không
    const finalBlockMap = newBlockMap.filter(block => {
        if (block.getType() === 'tableStructure') {
            return cellTableKey.includes(block.getKey());
        }
        return true;
    });

    // Tạo ContentState mới với các blocks đã được lọc
    const newContentState = contentState.merge({
        blockMap: finalBlockMap
    });

    // Tạo EditorState mới với ContentState mới
    const newEditorState = EditorState.push(editorState, newContentState, 'remove-range');

    return newEditorState;
};

export default deleteTableEmpty;