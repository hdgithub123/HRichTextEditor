import React, { useState, useEffect } from 'react';
import { Editor, EditorState, CompositeDecorator ,convertToRaw} from 'draft-js';
import createDecorator from './createDecorator';
import findImageEntities from './findImageEntities';
import addImage from './addImage';
import updateImageInline from './updateImageInline';



const ImangeInlineEditor = () => {
    const [entityImage, setEntityImage] = useState(null)
    const [sizeImage, setSizeImage] = useState(null)

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    useEffect(() => {
        const decorator = createDecorator({editorState, onImageSizeChange});
        const newEditorState = EditorState.set(editorState, { decorator });
        setEditorState(newEditorState);
    }, []);

    const handleChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const onImageSizeChange = (imageinfo) => {
        setEntityImage(imageinfo.entityKey);
        setSizeImage(imageinfo.size);
        console.log(imageinfo);
    }


    useEffect(() => {
        if (entityImage && sizeImage) {
            const {height, width, unit} = sizeImage;
            const forcedEditorState = updateImageInline(entityImage, { height: height, width: width, unit: unit }, editorState);
            handleChange(forcedEditorState);
          } else {
            console.error('No entityImage set');
          }
    }, [entityImage, sizeImage])

    const handleAddFixImage = () => {
        const url = 'https://24hstore.vn/upload_images/images/Hinh-nen-meo/hinh-nen-meo-cute-dep-ngau-1.jpg';
        const newEditorState = addImage({editorState, imageInfo: {url, width: '100', height: '100', unit: 'mm', styleImage:{objectFit:'contain'}}});
        setEditorState(newEditorState);
    }

    const handleAddNoneFixImage = () => {
        const url = 'https://24hstore.vn/upload_images/images/Hinh-nen-meo/hinh-nen-meo-cute-dep-ngau-1.jpg';
        const newEditorState = addImage({editorState, imageInfo:{url, width: '100', height: '100', unit: 'px', styleImage:{objectFit:'fill'}}});
        setEditorState(newEditorState);
    }

    const handleUpdateImage = () => {
        if (entityImage) {
            const {height, width, unit} = sizeImage;
            const forcedEditorState = updateImageInline(entityImage, { height: height, width: width, unit: unit }, editorState);
            handleChange(forcedEditorState);
          } else {
            console.error('No entityImage set');
          }
    }

    return <div>
        <Editor editorState={editorState} onChange={handleChange} />;
         {/* viết component để in sert 1 ảnh vào editor */}
         <button onClick={handleAddFixImage}>Add fix Image</button>
         <button onClick={handleAddNoneFixImage}>Add NonFix Image</button>
         <button onClick={handleUpdateImage}>Update Image</button>
         <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>

};

export default ImangeInlineEditor;



