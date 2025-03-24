import { EditorState, ContentBlock, genKey } from 'draft-js';
import { Map } from 'immutable';
import { defaultEditorStyle } from '../../_constant/_constant';

const defaultPageSetup = {
  pageHeight: '297mm',
  isRepeatThead: true,
  pageNumber: {
    position: '',
    format: '',
    style: {},
  },
};

const addAndUpdateMainBlock = ({ editorState, style, pageSetup }) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  // Kiểm tra xem block có key 'mainBlock' đã tồn tại hay chưa
  const existingBlock = blockMap.get('mainBlock');

  let newBlockMap;

  if (existingBlock) {
    // Nếu block đã tồn tại, chỉ cập nhật phần được truyền vào
    const existingData = existingBlock.getData();
    const updatedData = existingData.mergeDeep({
      blockStyle: style !== undefined ? style : existingData.get('blockStyle', defaultEditorStyle),
      pageSetup: pageSetup !== undefined ? pageSetup : existingData.get('pageSetup', defaultPageSetup),
    });

    const updatedBlock = existingBlock.merge({ data: updatedData });
    newBlockMap = blockMap.set('mainBlock', updatedBlock);
  } else {
    // Nếu block chưa tồn tại, tạo mới block với key 'mainBlock'
    const newBlock = new ContentBlock({
      key: 'mainBlock',
      type: 'MAIN_BLOCK',
      text: '',
      data: Map({
        blockStyle: style || defaultEditorStyle,
        pageSetup: pageSetup || defaultPageSetup,
      }),
    });

    newBlockMap = blockMap
      .toSeq()
      .take(1)
      .concat([[newBlock.getKey(), newBlock]])
      .concat(blockMap.toSeq().skip(1))
      .toOrderedMap();
  }

  // Cập nhật ContentState với blockMap mới
  const newContentState = contentState.merge({ blockMap: newBlockMap });

  // Tạo EditorState mới với ContentState mới
  return EditorState.push(editorState, newContentState, 'change-block-data');
};

export default addAndUpdateMainBlock;
