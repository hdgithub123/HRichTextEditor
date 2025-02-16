import ImageBlockToolBar from '../ImageBlock/ImageBlockToolBar/ImageBlockToolBar';
import ImageInlineToolBar from '../ImangeInline/ImageInlineToolBar/ImageInlineToolBar';
import style from './ImageToolBar.module.scss'

const ImageToolBar = ({ editorState, setEditorState,variable, onChange }) => {
    return (
        <div className={style.container}>
            <ImageBlockToolBar editorState={editorState} setEditorState={setEditorState}></ImageBlockToolBar>
            <ImageInlineToolBar editorState={editorState} setEditorState={setEditorState} infoImageInline={variable.infoImageInline}></ImageInlineToolBar>
        </div>
    );
}

export default ImageToolBar;