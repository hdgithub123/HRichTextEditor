import FontInput from '../FontChange/FontInput';
import TableToolbar from '../Table/Toolbar/TableToolbar';
import ImageToolBar from '../Image/ImageBlock/ImageBlockToolBar/ImageBlockToolBar';


const ToolbarsEditor = ({ editorState, setEditorState, onChange }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <FontInput editorState={editorState} setEditorState={setEditorState}></FontInput>
            <TableToolbar editorState = {editorState} onChange={onChange}></TableToolbar>
            <ImageToolBar editorState={editorState} setEditorState={setEditorState}></ImageToolBar>
        </div>
    );
}

export default ToolbarsEditor;