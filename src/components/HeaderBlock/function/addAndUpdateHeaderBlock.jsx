import { EditorState, ContentBlock, genKey, Modifier, SelectionState } from 'draft-js';
import { Map } from 'immutable';

const addAndUpdateHeaderBlock = ({ editorState, blockStyle = {} }) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  // Tìm block với key là 'headerBlock'
  const headerBlockKey = 'headerBlock';
  const headerBlock = blockMap.get(headerBlockKey);

  if (headerBlock) {
    // Nếu block tồn tại, cập nhật blockStyle
    const updatedBlock = headerBlock.merge({
      data: headerBlock.getData().merge({ blockStyle: blockStyle }),
    });

    const updatedBlockMap = blockMap.set(headerBlockKey, updatedBlock);

    const updatedContentState = contentState.merge({
      blockMap: updatedBlockMap,
    });

    return EditorState.push(editorState, updatedContentState, 'change-block-data');
  }

  // Nếu block chưa tồn tại, tạo block mới
  const newBlock = new ContentBlock({
    key: headerBlockKey, // Giữ key là 'headerBlock'
    type: 'HEADER_BLOCK',
    text: ' ',
    data: Map({ blockStyle: blockStyle }),
  });

  const newBlockMap = blockMap.set(newBlock.getKey(), newBlock);

  const lastBlockKey = contentState.getLastBlock().getKey();
  const selectionState = SelectionState.createEmpty(lastBlockKey);

  const newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionAfter: selectionState,
  });

  const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
  return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
};

export default addAndUpdateHeaderBlock;