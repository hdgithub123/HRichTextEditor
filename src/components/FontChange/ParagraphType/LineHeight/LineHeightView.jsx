import { RichUtils } from 'draft-js';
import { EditorState, Modifier } from 'draft-js';
import LineHeight from './LineHeight';
import { _LINEHEIGHT } from '../../../_constant/_constant'

const HEIGHTS = _LINEHEIGHT

const toggleLineHeight = (editorState, height) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
  
    // Cập nhật dữ liệu tùy chỉnh của block
    const newBlockData = block.getData().set('lineHeight', height);
    const newContentState = Modifier.setBlockData(contentState, selection, newBlockData);
  
    return EditorState.push(editorState, newContentState, 'change-block-data');
  };




const LineHeightView = ({ editorState, setEditorState }) => {

    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const currentBlock = currentContent.getBlockForKey(blockKey);
    // lay ra data textAlign của Block
    const blockLineHeight = currentBlock.getData().get('lineHeight');

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