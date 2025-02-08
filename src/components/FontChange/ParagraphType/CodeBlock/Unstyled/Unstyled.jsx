import React from 'react';
import { RichUtils } from 'draft-js';
import CodeBlockTypeControl from '../utilities/CodeBlockTypeControl';
import getCurrentBlock from '../utilities/getCurrentBlock';
import ImageIcon from './textUnstyled.svg'

const Unstyled = ({ editorState, setEditorState }) =>{

  const currentBlock = getCurrentBlock({editorState})

  const handleClickTypeOfBlock = (block) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, block);
    setEditorState(newEditorState);
  };

  return (
    <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={ImageIcon} altImage={"unstyled"} onClick={() => handleClickTypeOfBlock('unstyled')}></CodeBlockTypeControl>
  )
}

export default Unstyled;
