import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Editor, EditorState, AtomicBlockUtils, convertToRaw, ContentState, ContentBlock ,genKey} from 'draft-js';
import { Map } from 'immutable';


const insertImage = ({editorState,setEditorState,dataImage}) => {
    const newTableBlock = new ContentBlock({
      key: genKey(),
      type: 'IMAGE_BLOCK',
      text: ' ',
      data: Map(dataImage)
    });

    // tạo 1 block mới chèn vào editorState với data là dataImage
    const newContentState = editorState.getCurrentContent().merge({
      blockMap: editorState.getCurrentContent().getBlockMap().set(newTableBlock.getKey(), newTableBlock),
      selectionAfter: editorState.getSelection()
    });

  setEditorState(EditorState.push(editorState, newContentState, 'insert-fragment'));

};


export default insertImage;