import { EditorState } from 'draft-js';



const updateImage = ({ editorState, setEditorState, dataImage }) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const currentBlock = contentState.getBlockForKey(blockKey);
    const blockType = currentBlock.type

    if(!blockType || blockType === "IMAGE_BLOCK"){
          return
    }

    const newBlock = currentBlock.merge({
      data: currentBlock.getData().merge(dataImage),
    });

    const newContentState = contentState.merge({
      blockMap: contentState.getBlockMap().set(blockKey, newBlock),
    });

    const newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');
    setEditorState(newEditorState);
  };


export default updateImage;