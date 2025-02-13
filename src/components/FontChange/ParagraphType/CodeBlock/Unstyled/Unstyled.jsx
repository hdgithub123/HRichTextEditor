import React from 'react';
import { RichUtils } from 'draft-js';
import CodeBlockTypeControl from '../utilities/CodeBlockTypeControl';
import getCurrentBlock from '../../../../utilities/getCurrentBlockType';
import ImageIcon from './textUnstyled.svg'
import changeTypeOfBlock from '../utilities/changeTypeOfBlock'

const Unstyled = ({ editorState, setEditorState }) =>{

  const currentBlock = getCurrentBlock({editorState})

  const handleClickTypeOfBlock = (block) => {
    changeTypeOfBlock({ editorState, setEditorState, block })
  };

  return (
    <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={ImageIcon} altImage={"unstyled"} onClick={() => handleClickTypeOfBlock('unstyled')}></CodeBlockTypeControl>
  )
}

export default Unstyled;
