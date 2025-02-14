import {
    Editor,
    EditorState,
    Modifier,
  } from "draft-js";

const insertEmoji = ({emoji,editorState, setEditorState}) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    // Chèn emoji vào vị trí con trỏ hiện tại
    const newContentState = Modifier.insertText(contentState, selection, emoji, null);
    
    // Cập nhật EditorState
    const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
    setEditorState(newEditorState);
  };

export default insertEmoji