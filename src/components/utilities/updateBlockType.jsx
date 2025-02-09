import { EditorState, Modifier } from 'draft-js';

const updateBlockType = ({editorState, blockType}) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();

  const newContentState = Modifier.setBlockType(
    contentState,
    selection,
    blockType
  );

  return EditorState.push(editorState, newContentState, 'change-block-type');
};

export default updateBlockType;