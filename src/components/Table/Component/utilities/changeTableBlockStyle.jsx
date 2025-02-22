const changeTableBlockStyle = ({ editorState, blockStyle }) => {
    // Lấy selection
    const selectionState = editorState.getSelection();

    // Kiểm tra xem có phải là cellTable không, nếu không trả về editorState
    const currentContent = editorState.getCurrentContent();
    const blockKey = selectionState.getStartKey();
    const block = currentContent.getBlockForKey(blockKey);

    if (block.getType() !== 'cellTable') {
        return editorState;
    }
   const tableKey = block.getData().get('tableKey');
   const newEditorState = updateBlockStyleFromBlockKey ({editorState, blockKey:tableKey, blockStyle })
   return newEditorState;
};

export default changeTableBlockStyle;