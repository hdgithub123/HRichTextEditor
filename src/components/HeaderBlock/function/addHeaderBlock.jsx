import { EditorState, ContentBlock, genKey, Modifier, SelectionState } from 'draft-js';
import { Map } from 'immutable';

const addHeaderBlock = ({editorState, styleBlock = {}}) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const headerBlockExists = blockMap.some(block => block.getKey() === 'headerBlock');
  if (headerBlockExists) {
    return editorState;
  }
  // Tạo block mới với key, type, text, và data
  const newBlock = new ContentBlock({
    key: 'headerBlock',
    type: 'HEADER_BLOCK',
    text: ' ',
    data: Map({ styleBlock: styleBlock }),
  });

  // Lấy blockMap hiện tại và thêm block mới vào

  const newBlockMap = blockMap.set(newBlock.getKey(), newBlock);

  // Tạo selection state mới để chèn block vào vị trí mong muốn (ở đây là cuối cùng)
  const lastBlockKey = contentState.getLastBlock().getKey();
  const selectionState = SelectionState.createEmpty(lastBlockKey);

  // Tạo contentState mới với blockMap mới
  const newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionAfter: selectionState,
  });

  // Cập nhật editorState với contentState mới
  const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
  return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
};

export default addHeaderBlock;
