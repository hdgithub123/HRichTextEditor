import React from 'react';
import { RichUtils } from 'draft-js';
import CodeBlockTypeControl from '../utilities/CodeBlockTypeControl';
import getCurrentBlock from '../../../../utilities/getCurrentBlock';
import ImageIcon from './blockQuote.svg'
import changeTypeOfBlock from '../utilities/changeTypeOfBlock'


const Blockquote = ({ editorState, setEditorState }) =>{

  const currentBlock = getCurrentBlock({editorState})

  const handleClickTypeOfBlock = (block) => {
    changeTypeOfBlock({editorState,setEditorState,block})
  };

  return (
    <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={ImageIcon} altImage={"blockquote"} onClick={() => handleClickTypeOfBlock('blockquote')}></CodeBlockTypeControl>
  )
}

export default Blockquote;
