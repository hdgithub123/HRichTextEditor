const getCurrentBlockType = ({editorState}) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const currentBlock = contentState.getBlockForKey(blockKey);
    try {
      return currentBlock.getType();
    } catch (error) {
      return;
    }
  };

export default getCurrentBlockType;