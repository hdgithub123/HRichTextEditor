import { EditorState } from 'draft-js';



const updateImage = ({ editorState, setEditorState, dataImage }) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const currentBlock = contentState.getBlockForKey(blockKey);

    // const dataImage = {
    //   url,
    //   width: parseInt(width, 10),
    //   height: parseInt(height, 10),
    //   unit,
    //   styleImage: {
    //     objectFit,
    //   },
    //   blockStyle: {
    //     ...defaultBlockStyle,
    //     justifyContent,
    //     border: '1px solid #ccc',
    //   },
    // };

    const newBlock = currentBlock.merge({
      data: currentBlock.getData().merge(dataImage),
    });

    const newContentState = contentState.merge({
      blockMap: contentState.getBlockMap().set(blockKey, newBlock),
    });

    const newEditorState = EditorState.push(editorState, newContentState, 'change-block-data');
    setEditorState(newEditorState);
  };


export default updateImage;