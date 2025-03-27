import { EditorState, Modifier } from 'draft-js';

const deleteHeaderBlock = ({editorState}) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    // Tìm block có key = 'headerBlock'
    const headerBlockKey = 'headerBlock';
    const headerBlock = blockMap.get(headerBlockKey);

    // Nếu không tìm thấy headerBlock, trả về editorState hiện tại
    if (!headerBlock) {
        return editorState;
    }

    // Xóa headerBlock khỏi blockMap
    const newBlockMap = blockMap.delete(headerBlockKey);

    // Cập nhật contentState với blockMap mới
    const newContentState = contentState.merge({
        blockMap: newBlockMap,
    });

    // Tạo EditorState mới với contentState đã cập nhật
    const newEditorState = EditorState.push(editorState, newContentState, 'remove-range');

    return newEditorState;
};

export default deleteHeaderBlock;