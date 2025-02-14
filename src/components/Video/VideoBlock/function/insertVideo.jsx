import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Editor, EditorState, AtomicBlockUtils, convertToRaw, ContentState, ContentBlock, genKey, SelectionState } from 'draft-js';
import { Map } from 'immutable';

const insertVideo = ({ editorState, setEditorState, dataVideo }) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  // Tạo block unstyled trước block image
  const beforeBlock = new ContentBlock({
    key: genKey(),
    type: 'unstyled',
    text: '',
    data: Map(),
  });

  // Tạo block image
  const imageBlock = new ContentBlock({
    key: genKey(),
    type: 'VIDEO_BLOCK',
    text: ' ',
    data: Map(dataVideo),
  });

  // Tạo block unstyled sau block image
  const afterBlock = new ContentBlock({
    key: genKey(),
    type: 'unstyled',
    text: '',
    data: Map(),
  });

  // Lấy block map hiện tại và thêm các block mới
  const blockMap = contentState.getBlockMap();
  const newBlockMap = blockMap
    .set(beforeBlock.getKey(), beforeBlock)
    .set(imageBlock.getKey(), imageBlock)
    .set(afterBlock.getKey(), afterBlock);

  // Tạo contentState mới với block map đã cập nhật
  const newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionAfter: selectionState,
  });

  // Cập nhật selection để đặt con trỏ sau block image
  const newSelection = SelectionState.createEmpty(afterBlock.getKey());

  // Tạo editorState mới với contentState và selection đã cập nhật
  const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
  const finalEditorState = EditorState.forceSelection(newEditorState, newSelection);

  setEditorState(finalEditorState);
};

export default insertVideo;