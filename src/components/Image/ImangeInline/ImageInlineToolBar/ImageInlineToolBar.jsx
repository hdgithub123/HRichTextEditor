import addImage from '../function/addImage';

const ImageInlineToolBar = ({ editorState, setEditorState }) => {
    const handleAddFixImage = () => {
        const url = 'https://24hstore.vn/upload_images/images/Hinh-nen-meo/hinh-nen-meo-cute-dep-ngau-1.jpg';
        addImage({ editorState, setEditorState, imageInfo: { url, width: '100', height: '100', unit: 'mm', styleImage: { objectFit: 'contain' } } });
        // setEditorState(newEditorState);
    }

    const handleAddNoneFixImage = () => {
        const url = 'https://24hstore.vn/upload_images/images/Hinh-nen-meo/hinh-nen-meo-cute-dep-ngau-1.jpg';
        addImage({ editorState, setEditorState, imageInfo: { url, width: '100', height: '100', unit: 'px', styleImage: { objectFit: 'fill' } } });
        // setEditorState(newEditorState);
    }




    return (
        <div>
            <button onClick={handleAddFixImage}>Add fix Image</button>
            <button onClick={handleAddNoneFixImage}>Add NonFix Image</button>
        </div>
    );
}

export default ImageInlineToolBar;