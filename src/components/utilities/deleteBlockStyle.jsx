// viết hàm xóa blockStyle trong data:{blockStyle:{}}
import { EditorState, Modifier } from 'draft-js';

const deleteBlockStyle = ({editorState}) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(blockKey);


    if (blockKey === 'mainBlock') {
        return editorState;
    }

    // kiểm tra xem có blockStyle không
    if (!block.getData().get('blockStyle')) {
        return editorState;
    }
    // Xóa blockStyle trong data
    const newBlockData = block.getData().delete('blockStyle');

    // Tạo block mới với data đã cập nhật
    const newBlock = block.set('data', newBlockData);

    // Cập nhật contentState với block mới
    const newContentState = contentState.merge({
        blockMap: contentState.getBlockMap().set(blockKey, newBlock),
    });

    // Tạo editorState mới với contentState đã cập nhật
    const newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');

    return newEditorState;
};

export default deleteBlockStyle;