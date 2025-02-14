import { EditorState, RichUtils, Modifier } from 'draft-js';


const removeLink = ({ editorState, setEditorState }) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
        const contentState = editorState.getCurrentContent();
        const newContentState = Modifier.applyEntity(contentState, selection, null);
        const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
        setEditorState(newEditorState);
    }
};

export default removeLink;