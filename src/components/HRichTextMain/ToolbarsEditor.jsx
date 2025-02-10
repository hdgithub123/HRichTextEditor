import FontInput from '../FontChange/FontInput';
import TableToolbar from '../Table/Toolbar/TableToolbar';

const ToolbarsEditor = ({ editorState, setEditorState, onChange }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <FontInput editorState={editorState} setEditorState={setEditorState}></FontInput>
            <TableToolbar editorState = {editorState} onChange={onChange}></TableToolbar>
        </div>
    );
}

export default ToolbarsEditor;