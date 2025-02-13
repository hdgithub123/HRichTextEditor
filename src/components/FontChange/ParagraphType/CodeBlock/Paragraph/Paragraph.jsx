import React from 'react';
import { RichUtils } from 'draft-js';
import CodeBlockTypeControl from '../utilities/CodeBlockTypeControl';
import getCurrentBlock from '../../../../utilities/getCurrentBlockType';
import ImageIcon from './paragraph.svg'
import changeTypeOfBlock from '../utilities/changeTypeOfBlock'

const Paragraph = ({ editorState, setEditorState }) =>{

  const currentBlock = getCurrentBlock({editorState})

  const handleClickTypeOfBlock = (block) => {
    changeTypeOfBlock({ editorState, setEditorState, block })
  };

  return (
    <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={ImageIcon} altImage={"paragraph"} onClick={() => handleClickTypeOfBlock('paragraph')}></CodeBlockTypeControl>
  )
}

export default Paragraph;
