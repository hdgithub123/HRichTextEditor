import { EditorState, ContentBlock, genKey, Modifier, SelectionState } from 'draft-js';
import { Map } from 'immutable';



const addAndUpdateFooterBlock = ({ editorState, blockStyle = {} }) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  // Tìm block với key là 'footerBlock'
  const footerBlockKey = 'footerBlock';
  const footerBlock = blockMap.get(footerBlockKey);

  if (footerBlock) {
    // Nếu block tồn tại, cập nhật blockStyle
    const updatedBlock = footerBlock.merge({
      data: footerBlock.getData().merge({ blockStyle: blockStyle }),
    });

    const updatedBlockMap = blockMap.set(footerBlockKey, updatedBlock);

    const updatedContentState = contentState.merge({
      blockMap: updatedBlockMap,
    });

    return EditorState.push(editorState, updatedContentState, 'change-block-data');
  }

  // Nếu block chưa tồn tại, tạo block mới
  const newBlock = new ContentBlock({
    key: footerBlockKey, // Giữ key là 'footerBlock'
    type: 'FOOTER_BLOCK',
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

export default addAndUpdateFooterBlock;