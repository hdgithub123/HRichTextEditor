import FontInput from '../FontChange/FontInput';
import TableToolbar from '../Table/Toolbar/TableToolbar';
import ImageBlockToolBar from '../Image/ImageBlock/ImageBlockToolBar/ImageBlockToolBar';
import ImageInlineToolBar from '../Image/ImangeInline/ImageInlineToolBar/ImageInlineToolBar';

const ToolbarsEditor = ({ editorState, setEditorState, onChange }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <FontInput editorState={editorState} setEditorState={setEditorState}></FontInput>
            <TableToolbar editorState = {editorState} onChange={onChange}></TableToolbar>
            <ImageBlockToolBar editorState={editorState} setEditorState={setEditorState}></ImageBlockToolBar>
            <h1>Imge Inine</h1>
            <ImageInlineToolBar editorState={editorState} setEditorState={setEditorState}></ImageInlineToolBar>
        </div>
    );
}

export default ToolbarsEditor;