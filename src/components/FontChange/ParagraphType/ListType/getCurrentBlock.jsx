const getCurrentBlock = ({editorState}) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const currentBlock = contentState.getBlockForKey(blockKey);
    return currentBlock.getType();
  };

export default getCurrentBlock;