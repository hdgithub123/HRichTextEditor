import React, { useRef, useEffect } from 'react';
import { EditorBlock } from 'draft-js';
import { createPortal } from 'react-dom';

const CellComponent = props => {
    const {
        block,
        blockProps: { editorRef },
    } = props;
    
    const blockData = block.getData();
    const text = block.getText().trim() === '' ? '\u00A0' : block.getText();
    const blockStyle = blockData.get('blockStyle');

    const targetRef = useRef(null);
    
    useEffect(() => {
        if (blockData.get('cellPosition')) {
            const position = blockData.get('cellPosition');
            targetRef.current = editorRef?.editor.querySelector(`[cell-position='${position}']`);
        }
    }, [editorRef, blockData]);

    return targetRef.current ? createPortal(
        <div tagType="resize" style={{ ...blockStyle }}>
            <EditorBlock {...props} block={block.set('text', text)} />
        </div>,
        targetRef.current
    ) : null;
};

export default CellComponent;
