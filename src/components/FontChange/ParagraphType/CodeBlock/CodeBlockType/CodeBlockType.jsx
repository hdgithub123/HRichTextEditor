import React from 'react';
import { RichUtils } from 'draft-js';
import CodeBlockTypeControl from '../utilities/CodeBlockTypeControl';
import getCurrentBlock from '../utilities/getCurrentBlock';
import ImageIcon from './codeBlock.svg'

const CodeBlockType = ({ editorState, setEditorState }) =>{

  const currentBlock = getCurrentBlock({editorState})

  const handleClickTypeOfBlock = (block) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, block);
    setEditorState(newEditorState);
  };

  return (
    <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={ImageIcon} altImage={"code-block"} onClick={() => handleClickTypeOfBlock('code-block')}></CodeBlockTypeControl>
  )
}

export default CodeBlockType;
