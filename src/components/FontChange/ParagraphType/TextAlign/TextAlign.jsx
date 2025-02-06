import React from 'react';
import { EditorState, Modifier } from 'draft-js';

// Hàm cập nhật thuộc tính dữ liệu tùy chỉnh `textAlign` của block
const toggleTextAlign = (editorState, alignment) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selection.getStartKey());

  // Cập nhật dữ liệu tùy chỉnh của block
  const newBlockData = block.getData().set('textAlign', alignment);
  const newContentState = Modifier.setBlockData(contentState, selection, newBlockData);

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

// Component TextAlign
const TextAlign = ({ editorState, setEditorState }) => {
  const handleTextAlign = (alignment) => {
    const newState = toggleTextAlign(editorState, alignment);
    setEditorState(newState);
  };

  return (
    <div>
      <button onClick={() => handleTextAlign('left')}>Left Align</button>
      <button onClick={() => handleTextAlign('center')}>Center Align</button>
      <button onClick={() => handleTextAlign('right')}>Right Align</button>
      <button onClick={() => handleTextAlign('justify')}>Justify</button>
    </div>
  );
};

export default TextAlign;
