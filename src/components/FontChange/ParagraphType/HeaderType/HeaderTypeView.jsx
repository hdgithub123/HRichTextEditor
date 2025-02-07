import { RichUtils } from 'draft-js';
import HeaderType from './HeaderType';

const HeaderTypeView = ({ editorState, setEditorState }) => {
    const getCurrentBlockType = (style) => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
      }
    
      const handleClickTypeOfBlock = (block) => {
        const newEditorState = RichUtils.toggleBlockType(editorState, block);
        setEditorState(newEditorState);
      };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <HeaderType currentHeaderType={getCurrentBlockType('header-two')} onClick={(headerType) => handleClickTypeOfBlock(headerType)} />
        </div>
    )
}

export default HeaderTypeView;