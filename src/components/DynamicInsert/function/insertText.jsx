import { EditorState, Modifier } from 'draft-js'

const insertText = ({ editorState, text }) => {
  const currentContent = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  if (!selectionState) {
    return editorState;
  }

  // Chèn văn bản động vào vị trí của selection
  const newContent = Modifier.insertText(
    currentContent,
    selectionState,
    text
  );

  // Cập nhật EditorState với nội dung mới
  const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
  return newEditorState;
};

export default insertText;

