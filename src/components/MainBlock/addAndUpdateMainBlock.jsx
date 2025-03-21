// import { EditorState, ContentBlock, genKey, Modifier } from 'draft-js';
// import { Map } from 'immutable';
// import {defaultEditorStyle} from '../_constant/_constant'


// const addAndUpdateMainBlock = ({ editorState, style = defaultEditorStyle }) => {
//   const contentState = editorState.getCurrentContent();
//   const blockMap = contentState.getBlockMap();

//   // Kiểm tra xem block có key 'mainBlock' đã tồn tại hay chưa
//   const existingBlock = blockMap.get('mainBlock');

//   let newBlockMap;

//   if (existingBlock) {
//     // Nếu block đã tồn tại, cập nhật blockStyle trong data của block đó
//     const existingData = existingBlock.getData();
//     const updatedData = existingData.mergeDeep({ blockStyle: style });
//     const updatedBlock = existingBlock.merge({ data: updatedData });

//     newBlockMap = blockMap.set('mainBlock', updatedBlock);
//   } else {
//     // Nếu block chưa tồn tại, tạo mới block với key 'mainBlock'
//     const newBlock = new ContentBlock({
//       key: 'mainBlock',
//       type: 'MAIN_BLOCK',
//       text: '',
//       data: Map({ blockStyle: style }),
//     });

//     newBlockMap = blockMap
//       .toSeq()
//       .take(1)
//       .concat([[newBlock.getKey(), newBlock]])
//       .concat(blockMap.toSeq().skip(1))
//       .toOrderedMap();
//   }

//   // Cập nhật ContentState với blockMap mới
//   const newContentState = contentState.merge({
//     blockMap: newBlockMap,
//   });

//   // Tạo EditorState mới với ContentState mới
//   const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');

//   // Cập nhật editorState
//   // setEditorState(newEditorState);
//   return newEditorState
// };

// export default addAndUpdateMainBlock;


import { EditorState, ContentBlock, genKey, Modifier } from 'draft-js';
import { Map } from 'immutable';
import { defaultEditorStyle } from '../_constant/_constant';

const defaultPageSetup = {
  pageHeight: '297mm',
  isRepeatThead: true,
  pageNumber: {
    position: '',
    format: '',
    style: {},
  },
};

const addAndUpdateMainBlock = ({ editorState, style = defaultEditorStyle, pageSetup = defaultPageSetup }) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  // Kiểm tra xem block có key 'mainBlock' đã tồn tại hay chưa
  const existingBlock = blockMap.get('mainBlock');

  let newBlockMap;

  if (existingBlock) {
    // Nếu block đã tồn tại, cập nhật blockStyle và pageSetup trong data của block đó
    const existingData = existingBlock.getData();
    const updatedData = existingData.mergeDeep({
      blockStyle: style,
      pageSetup: pageSetup,
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
        blockStyle: style,
        pageSetup: pageSetup,
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
  const newContentState = contentState.merge({
    blockMap: newBlockMap,
  });

  // Tạo EditorState mới với ContentState mới
  const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');

  return newEditorState;
};

export default addAndUpdateMainBlock;
