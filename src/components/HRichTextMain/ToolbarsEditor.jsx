import FontInput from '../FontChange/FontInput';
import TableToolbar from '../Table/TableToolBar/TableToolbar';
import ImageToolBar from '../Image/ImageToolBar/ImageToolBar'


const ToolbarsEditor = ({ editorState, setEditorState,variable, onChange }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <FontInput editorState={editorState} setEditorState={setEditorState}></FontInput>
            <TableToolbar editorState = {editorState} setEditorState={setEditorState} onChange={onChange}></TableToolbar>
            <ImageToolBar editorState={editorState} setEditorState={setEditorState} variable={variable}></ImageToolBar>
        </div>
    );
}

export default ToolbarsEditor;