import { Modifier, EditorState, SelectionState } from 'draft-js';

const updateBlockStyleFromBlockKey = ({ editorState, blockKey, blockStyle }) => {
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockKey);
  const blockStyleInBlock = block.getData().get('blockStyle');

  let blockStyleJS = {};
  try {
    blockStyleJS = blockStyleInBlock ? blockStyleInBlock.toJS() : {};
  } catch (error) {
    blockStyleJS = blockStyleInBlock;
  }

  const newBlockStyle = {
    ...blockStyleJS,
    ...blockStyle,
  };

  const blockData = block.getData().merge({
    blockStyle: newBlockStyle,
  });

  // Tạo SelectionState mới cho block có key là blockKey
  const selection = SelectionState.createEmpty(blockKey);

  const newContentState = Modifier.setBlockData(contentState, selection, blockData);

  return EditorState.push(editorState, newContentState, 'adjust-style');
};

export default updateBlockStyleFromBlockKey;