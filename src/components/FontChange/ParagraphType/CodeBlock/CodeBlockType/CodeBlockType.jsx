import React from 'react';
import { RichUtils } from 'draft-js';
import CodeBlockTypeControl from '../utilities/CodeBlockTypeControl';
import getCurrentBlock from '../../../../utilities/getCurrentBlockType';
import ImageIcon from './codeBlock.svg'
import changeTypeOfBlock from '../utilities/changeTypeOfBlock'

const CodeBlockType = ({ editorState, setEditorState }) => {

  const currentBlock = getCurrentBlock({ editorState })

  const handleClickTypeOfBlock = (block) => {
    changeTypeOfBlock({ editorState, setEditorState, block })
  };

  return (
    <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={ImageIcon} altImage={"code-block"} onClick={() => handleClickTypeOfBlock('code-block')}></CodeBlockTypeControl>
  )
}

export default CodeBlockType;
