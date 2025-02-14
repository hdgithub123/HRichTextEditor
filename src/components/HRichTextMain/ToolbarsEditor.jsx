import FontInput from '../FontChange/FontInput';
import TableToolbar from '../Table/TableToolBar/TableToolbar';
import ImageToolBar from '../Image/ImageToolBar/ImageToolBar'
import LinkifyToolBar from  '../Linkify/ToolBar/LinkifyToolBar'
import EmojiToolBar from '../Emoji/ToolBar/EmojiToolBar'
import UndoRedoToolBar from '../UndoRedoToolBar/UndoRedoToolBar'

const ToolbarsEditor = ({ editorState, setEditorState,variable, onChange }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <FontInput editorState={editorState} setEditorState={setEditorState}></FontInput>
            <TableToolbar editorState = {editorState} setEditorState={setEditorState} onChange={onChange}></TableToolbar>
            <ImageToolBar editorState={editorState} setEditorState={setEditorState} variable={variable}></ImageToolBar>
            <LinkifyToolBar editorState={editorState} setEditorState={setEditorState}></LinkifyToolBar>
            <EmojiToolBar editorState={editorState} setEditorState={setEditorState}></EmojiToolBar>
            <UndoRedoToolBar editorState={editorState} setEditorState={setEditorState}></UndoRedoToolBar>
        </div>
    );
}

export default ToolbarsEditor;