import {  EditorBlock } from 'draft-js';
import { createPortal } from 'react-dom';

const CellComponent = props => {
    const {
        block,
        blockProps: { editorRef },
    } = props;
    const text = block.getText();
    if (block.getData().get('cellPosition')) {
        const position = block.getData().get('cellPosition');
        const target = editorRef?.editor.querySelector(`[cell-position='${position}']`);
        if (target) {
            // khoi 1
            const content = text.trim() === '' ? '\u00A0' : text; // '\u00A0' là ký tự khoảng trắng không ngắt (non-breaking space)
            return createPortal(<EditorBlock {...props} block={block.set('text', content)} />, target);
            
            // khoi 2
            // const content = text.trim()
            // if (content === '') {
            //     const contentTemp = '\u00A0'; // '\u00A0' là ký tự khoảng trắng không ngắt (non-breaking space)
            //     return createPortal(<EditorBlock {...props} block={block.set('text', contentTemp)} />, target);
            // } else {
            //     return createPortal(<EditorBlock {...props} />, target);
            // }
            
            // khoi 3
            // return createPortal(<EditorBlock {...props} />, target);
        }
        return null;
    }
    return null;
}

export default CellComponent;