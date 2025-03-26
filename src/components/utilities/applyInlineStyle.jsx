import { Modifier, EditorState, RichUtils } from "draft-js";

const applyInlineStyle = ({ editorState, inlineStyle, isRemove = false }) => {
    const currentStyle = editorState.getCurrentInlineStyle(); // Get current styles
    const contentState = editorState.getCurrentContent(); // Get current content
    const selection = editorState.getSelection(); // Get selection range

    // Filter all styles that match the prefix of the inline style (e.g., `backgroundColor.`)
    const stylesToRemove = currentStyle.filter((style) =>
        style.startsWith(inlineStyle.split(".")[0]) // Match the prefix, e.g., `backgroundColor`
    );

    let newContentState = contentState;

    // Remove all matching styles (or only the specific inlineStyle if isRemove = true)
    stylesToRemove.forEach((style) => {
        if (isRemove && style !== inlineStyle) return; // Remove only the specific inlineStyle if isRemove = true
        newContentState = Modifier.removeInlineStyle(newContentState, selection, style);
    });

    // If isRemove is true, return the editorState after removing styles
    if (isRemove) {
        return EditorState.push(editorState, newContentState, "change-inline-style");
    }

    // Otherwise, apply the inlineStyle
    const editorStateWithoutStyles = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
    );

    const newEditorStateWithStyle = RichUtils.toggleInlineStyle(
        editorStateWithoutStyles,
        inlineStyle
    );

    return newEditorStateWithStyle;
};

export default applyInlineStyle