import { RichUtils } from 'draft-js';
import { EditorState, Modifier } from 'draft-js';
import updateBlockStyle from '../../../utilities/updateBlockStyle'
import LineHeight from './LineHeight';
import { _LINEHEIGHT } from '../../../_constant/_constant'

const HEIGHTS = _LINEHEIGHT

const toggleLineHeight = (editorState, height) => {
  const blockStyle = { lineHeight: height }
  const newContentState = updateBlockStyle({ editorState, blockStyle })
  return newContentState;
};


const LineHeightView = ({ editorState, setEditorState }) => {

  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const blockKey = selection.getStartKey();
  const currentBlock = currentContent.getBlockForKey(blockKey);
  // lay ra data textAlign của Block
  let blockLineHeight = 'normal'

  try {
    // blockLineHeight = currentBlock.getData().get('lineHeight');
    blockLineHeight = currentBlock.getData().getIn(['blockStyle', 'lineHeight']);
  } catch (error) {
    blockLineHeight = 'normal'
  }


  const handleLineHeight = (height) => {
    const newState = toggleLineHeight(editorState, height);
    setEditorState(newState);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <LineHeight heights={HEIGHTS} curentHeight={blockLineHeight} onSelectHeight={handleLineHeight} />
    </div>
  )
}

export default LineHeightView;