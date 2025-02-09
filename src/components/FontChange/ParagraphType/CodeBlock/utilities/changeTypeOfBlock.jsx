import { RichUtils } from 'draft-js';
import { _NOTCHANGEBLOCK } from '../../../../_constant/_constant';
import getCurrentBlock from './getCurrentBlock';

const notChangeBlock = _NOTCHANGEBLOCK
const changeTypeOfBlock = ({ editorState, setEditorState, block }) => {
  const currentBlock = getCurrentBlock({ editorState });
  if (notChangeBlock.includes(currentBlock) || !currentBlock) {
    return;
  }
  const newEditorState = RichUtils.toggleBlockType(editorState, block);
  setEditorState(newEditorState);
};
export default changeTypeOfBlock;