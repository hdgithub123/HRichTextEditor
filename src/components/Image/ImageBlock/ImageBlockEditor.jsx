import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Editor, EditorState, AtomicBlockUtils, convertToRaw, ContentState, ContentBlock ,genKey} from 'draft-js';
import { Map } from 'immutable';
import ImageBlockComponent from './ImageBlockComponent';


const ImageBlockEditor = () => {
    const editorRef = useRef(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [imageUrl, setImageUrl] = useState('');
  
    const insertImageBlock = (dataImage) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', dataImage);
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        setEditorState(newEditorState);
      };
  
    const insertImage = () => {
        const dataImage = {
            url: 'https://24hstore.vn/upload_images/images/Hinh-nen-meo/hinh-nen-meo-cute-dep-ngau-1.jpg',
            width: 150,
            height: 150,
            unit: 'mm',
            styleImage: {
                objectFit: 'contain',
            },
        }

        const newTableBlock = new ContentBlock({
          key: genKey(),
          type: 'IMAGE_BLOCK',
          text: ' ',
          data: Map(dataImage)
        });

        // tạo 1 block mới chèn vào editorState với data là dataImage
        const newContentState = editorState.getCurrentContent().merge({
          blockMap: editorState.getCurrentContent().getBlockMap().set(newTableBlock.getKey(), newTableBlock),
          selectionAfter: editorState.getSelection()
        });

      setEditorState(EditorState.push(editorState, newContentState, 'insert-fragment'));

    };
  

    const insertChangeImage = () => {
      const dataImage = {
          url: 'https://24hstore.vn/upload_images/images/Hinh-nen-meo/hinh-nen-meo-cute-dep-ngau-1.jpg',
          width: 150,
          height: 150,
          unit: 'mm',
          styleImage: {
              objectFit: 'fill',
          },
      }

      const newTableBlock = new ContentBlock({
        key: genKey(),
        type: 'IMAGE_BLOCK',
        text: ' ',
        data: Map(dataImage)
      });

      // tạo 1 block mới chèn vào editorState với data là dataImage
      const newContentState = editorState.getCurrentContent().merge({
        blockMap: editorState.getCurrentContent().getBlockMap().set(newTableBlock.getKey(), newTableBlock),
        selectionAfter: editorState.getSelection()
      });

    setEditorState(EditorState.push(editorState, newContentState, 'insert-fragment'));

  };

  
    const blockRendererFn = (contentBlock) => {
      const type = contentBlock.getType();
      if (type === 'IMAGE_BLOCK') {
        return {
          component: ImageBlockComponent,
          editable: false,
          props: {
            editorRef,
            getEditorState: () => editorState,
            onChange: setEditorState,
          },
        };
      }
      return null;
    };
  
  
    return (
      <div>
        <button onClick={insertImage}>Insert Unchange Image</button>
        <button onClick={insertChangeImage}>Insert Change Image</button>
          
        <div>
          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={setEditorState}
            blockRendererFn={blockRendererFn}
          />
        </div>
        <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
      </div>
    );
  };


export default ImageBlockEditor;



