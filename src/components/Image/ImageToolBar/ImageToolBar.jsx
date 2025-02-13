import ImageBlockToolBar from '../ImageBlock/ImageBlockToolBar/ImageBlockToolBar';
import ImageInlineToolBar from '../ImangeInline/ImageInlineToolBar/ImageInlineToolBar';

const ImageToolBar = ({ editorState, setEditorState,variable, onChange }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <ImageBlockToolBar editorState={editorState} setEditorState={setEditorState}></ImageBlockToolBar>
            <ImageInlineToolBar editorState={editorState} setEditorState={setEditorState} infoImageInline={variable.infoImageInline}></ImageInlineToolBar>
        </div>
    );
}

export default ImageToolBar;