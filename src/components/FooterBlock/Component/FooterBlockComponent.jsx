import React, { useRef, useEffect } from 'react';
import { EditorBlock } from 'draft-js';
import { createPortal } from 'react-dom';
import style from './FooterBlockComponent.module.scss'


const FooterBlockComponent = props => {
    const {
        block,
        blockProps: { editorRef },
    } = props;
    const blockData = block.getData();
    const text = block.getText().trim() === '' ? '\u00A0' : block.getText();
    const blockStyle = blockData.get('blockStyle');

    return (
        <footer title='Insert Footer' className={style.headerContainer} style={{...blockStyle,  position:'absolute',bottom:'0%',left:'0%', zIndex:2 }}>
            <EditorBlock {...props} block={block.set('text', text)} />
        </footer>
    )
};

export default FooterBlockComponent;