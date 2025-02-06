import {  EditorBlock } from 'draft-js';
import { createPortal } from 'react-dom';

const CellComponent = props => {
    const {
        block,
        blockProps: { editorRef },
    } = props;

    if (block.getData().get('cellPosition')) {
        const position = block.getData().get('cellPosition');
        const target = editorRef?.editor.querySelector(`[cell-position='${position}']`);
        if (target) {
            return createPortal(<EditorBlock {...props} />, target);
        }
        return null;
    }
    return null;
}

export default CellComponent;