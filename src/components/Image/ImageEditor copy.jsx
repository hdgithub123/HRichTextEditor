import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Editor, EditorState, AtomicBlockUtils, convertToRaw, ContentState } from 'draft-js';
import { Map } from 'immutable';
import 'draft-js/dist/Draft.css';

import style from './ImageEditor.module.css';


const block ={
  
}

const Image = props => {
  const image = useRef(null);
  const container = useRef(null);
  const {
    block,
    contentState,
    blockProps: { editorRef, getEditorState, onChange },
  } = props;

  // function used to update block data and propagate it to editorState
  const updateBlockData = useCallback(()=>{
    const newBlockData = updateBlockData({getEditorState, block, newData: block.getData()});
    onChange(newBlockData);
  },
    
    [block, getEditorState, onChange]
  );

  // turn on resizing when the image is clicked
  const handleClick = () => {
    if (editorRef.current.editor.getAttribute('contenteditable') === 'false') {
      return null;
    }
    const data = block.getData();
    if (!data.get('isActive')) {
      updateBlockData({ isActive: true });
      keepActive.current = true;
      setResize('both');
    }
  };

  // turn off resizing when isActive is removed from the block data (removal is done in the onChange method in index.js)
  const keepActive = useRef(false);
  const [resize, setResize] = useState('none');
  useEffect(() => {
    const { isActive } = block.getData();
    //if (!isActive && !keepActive.current) {
    if (isActive && !keepActive.current) {
      setResize('none');
    } else {
      keepActive.current = false;
    }
  }, [block]);

  // save the size info to local state, or if size data isn't present in block-data get it from the loaded image, with a fallback to a default of 250 x 250
  const data = block.getData();
  let imgStyle = data.get('imgStyle');
  console.log('imgStyle', imgStyle);
  let figStyle = data.delete('imgStyle');
  console.log('figStyle', figStyle);
  imgStyle =
    (imgStyle &&
      data
        .get('imgStyle')
        .mapKeys(k => camelCase(k))
        .toJS()) ||
    {};
    console.log('imgStyle2', imgStyle);
  figStyle =
    (figStyle &&
      figStyle
        .filter(v => v !== 'class')
        .mapKeys(k => camelCase(k))
        .toJS()) ||
    {};
    console.log('figStyle2', figStyle);
  const { height, width } = imgStyle;
  delete imgStyle.height;
  delete imgStyle.width;
  const [size, setSize] = useState({ height, width });

  const handleImgLoaded = () => {
    const { naturalHeight, naturalWidth } = image.current;
    if (!size.height || !size.width) {
      if (naturalHeight && naturalWidth) {
        const height = `${naturalHeight}px`;
        const width = `${naturalWidth}px`;
        updateBlockData({ imgStyle: Map({ 'object-fit': 'contain', height, width }) });
        setSize({ height, width });
      } else {
        setSize({ height: '250px', width: '250px' });
      }
    }
  };

  //if the dimensions of the container div change, update state and block-data
  const handleMouseUp = () => {
    let { height, width } = container.current.getBoundingClientRect();
    height = `${height}px`;
    width = `${width}px`;
    if (size.height !== height || size.width !== width) {
      updateBlockData({ imgStyle: Map(block.getData().get('imgStyle')).merge({ height, width })});
      setSize({ height, width });
    }
  };


  const { src } = (block.getEntityAt(0) && contentState.getEntity(block.getEntityAt(0)).getData()) || {};
  const borderColor = theme => (resize === 'both' ? theme.colors.textOnPageBackground : 'transparent');
 
 
  return (
    <div className={style.cover} style={{ justifyContent: 'center'}}>
      <div
        ref={container}
        className={style.image-container}
        style={{ width: '100px', height: '100px', cursor: resize === 'both' ? 'nwse-resize' : 'default' }}
        onClick={handleClick}
        onMouseUp={handleMouseUp}
      >
        <img ref={image} src={src} className={style.imgStyle} onLoad={handleImgLoaded} />
      </div>
    </div>

  );
};




const ImageEditor = () => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imageUrl, setImageUrl] = useState('');

  const handleOnUpload = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(true, reader.result); // Giả sử tải lên thành công và trả về URL của hình ảnh
    };
    reader.onerror = () => {
      callback(false, null); // Giả sử tải lên thất bại
    };
    reader.readAsDataURL(file);
  };

  const insertImage = ({ imgUrl, imgFile }) => {
    if (!imgUrl && imgFile) {
      handleOnUpload(imgFile, insertImageHandleResponse);
      return;
    }
    let contentState = editorState.getCurrentContent();
    contentState = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imgUrl });
    const entityKey = contentState.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    setEditorState(newEditorState);
  };

  const insertImageHandleResponse = (valid, resp) => {
    if (valid) {
      insertImage({ imgUrl: resp });
    } else {
      const fileReader = new window.FileReader();
      fileReader.readAsDataURL(newImgFile.current);
      fileReader.onloadend = e => {
        insertImage({ imgUrl: e.target.result });
      };
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleInsertImage = () => {
    insertImage({ imgUrl: imageUrl });
    setImageUrl('');
  };

  const blockRendererFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      return {
        component: Image,
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
      <div>
        <input
          type="text"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Enter image URL"
          style={{ marginRight: '10px', padding: '5px', width: '300px' }}
        />
        <button onClick={handleInsertImage} style={{ marginRight: '10px' }}>
          Insert Image from URL
        </button>
        <input
          type="file"
          onChange={(e) => insertImage({ imgFile: e.target.files[0] })}
          style={{ marginRight: '10px' }}
        />
      </div>
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

export default ImageEditor;

function camelCase(input) {
  return input
    .toLowerCase() // Ensure all characters are lowercase initially
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase()); // Replace delimiter and capitalize next character
}


const updateBlockData = ({getEditorState, block, newData}) => {
  const data = block.getData();
  const newBlock = block.set('data', data.merge(newData));
  let blockMap = getEditorState().getCurrentContent().getBlockMap();
  blockMap = blockMap.set(block.getKey(), newBlock);
  const newContent = getEditorState().getCurrentContent().set('blockMap', blockMap);
  const selection = getEditorState().getSelection();
  let editorState = EditorState.push(getEditorState(), newContent, 'change-block-data');
  editorState = EditorState.forceSelection(editorState, selection);
  return editorState;
}