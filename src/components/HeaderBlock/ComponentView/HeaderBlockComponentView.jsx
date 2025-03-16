import React, { useRef, useEffect } from 'react';
import { EditorBlock } from 'draft-js';
import { createPortal } from 'react-dom';
import style from './HeaderBlockComponentView.module.scss'


const HeaderBlockComponentView = props => {
    const {
        block,
        blockProps: { editorRef },
    } = props;
    const blockData = block.getData();
    const text = block.getText().trim() === '' ? '\u00A0' : block.getText();
    const blockStyle = blockData.get('blockStyle');
    return (
        // <header className={style.headerContainer} style={{...blockStyle,  position:'absolute',top:'0%',left:'0%', zIndex:2 }}>
        <header id='hrteHeaderID' className={style.headerContainer} style={{ ...blockStyle ,}}>
            <EditorBlock {...props} block={block.set('text', text)} />
        </header>
    )
};

export default HeaderBlockComponentView;