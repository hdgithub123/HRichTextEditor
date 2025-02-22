import { EditorState, ContentBlock, genKey, Modifier, SelectionState } from 'draft-js';
import { Map } from 'immutable';

const addHeaderBlock = ({editorState}) => {
  const contentState = editorState.getCurrentContent();
    // kiểm tra nếu đã tồn tại block có key là headerBlock thì trả về editorState
    const blockMap = contentState.getBlockMap();
    const headerBlockExists = blockMap.some(block => block.getKey() === 'headerBlock');
    if (headerBlockExists) {
        return editorState;
    }

  // Tạo một block mới với key là 'headerBlock', type là 'HEADER_BLOCK', text là ' ', và data là {styleBlock: {}}
  const newBlock = new ContentBlock({
    key: 'headerBlock',
    type: 'HEADER_BLOCK',
    text: '123 ',
    data: Map({ styleBlock: { background: 'black'} }),
  });

  // Lấy block đầu tiên hiện tại
  const firstBlockKey = contentState.getFirstBlock().getKey();

  // Tạo một blockMap mới bằng cách chèn block mới vào đầu
//   const blockMap = contentState.getBlockMap();
  const newBlockMap = blockMap
    .toOrderedMap()
    .set(newBlock.getKey(), newBlock)
    .sort((a, b) => (a === newBlock ? -1 : b === newBlock ? 1 : blockMap.keySeq().indexOf(a.getKey()) - blockMap.keySeq().indexOf(b.getKey())));

  // Tạo một selection state mới để chèn block vào đầu
  const selectionState = SelectionState.createEmpty(newBlock.getKey());

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
