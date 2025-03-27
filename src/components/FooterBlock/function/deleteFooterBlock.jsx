import { EditorState, Modifier } from 'draft-js';

const deleteFooterBlock = ({editorState}) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    // Tìm block có key = 'footerBlock'
    const footerBlockKey = 'footerBlock';
    const footerBlock = blockMap.get(footerBlockKey);

    // Nếu không tìm thấy footerBlock, trả về editorState hiện tại
    if (!footerBlock) {
        return editorState;
    }

    // Xóa footerBlock khỏi blockMap
    const newBlockMap = blockMap.delete(footerBlockKey);

    // Cập nhật contentState với blockMap mới
    const newContentState = contentState.merge({
        blockMap: newBlockMap,
    });

    // Tạo EditorState mới với contentState đã cập nhật
    const newEditorState = EditorState.push(editorState, newContentState, 'remove-range');

    return newEditorState;
};

export default deleteFooterBlock;
