import { Modifier, EditorState } from 'draft-js';

const updateBlockStyle = ({ editorState, blockStyle }) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const blockKey = selection.getStartKey();
  const block = contentState.getBlockForKey(blockKey);
  const blockStyleInBlock = block.getData().get('blockStyle');

  let blockStyleJS = {}
  try {
    blockStyleJS = blockStyleInBlock ? blockStyleInBlock.toJS() : {};
  } catch (error) {
    blockStyleJS = blockStyleInBlock
  }

  const newBlockStyle = {
    ...blockStyleJS,
    ...blockStyle,
  }

  const blockData = block.getData().merge({
    blockStyle: newBlockStyle,
  });

  const newContentState = Modifier.setBlockData(contentState, selection, blockData);

  return EditorState.push(editorState, newContentState, 'adjust-style');
};

export default updateBlockStyle;