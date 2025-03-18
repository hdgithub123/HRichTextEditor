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
    let blockStyle = blockData.get('blockStyle');
    try {
       blockStyle = blockStyle.toJS();
   } catch (error) {
       blockStyle = blockStyle;
   }
    return (
        // <header className={style.headerContainer} style={{...blockStyle,  position:'absolute',top:'0%',left:'0%', zIndex:2 }}>
        <header id='hrteHeaderID' className={style.headerContainer} style={{whiteSpace: "pre-wrap", ...blockStyle ,}}>
            <EditorBlock {...props} block={block.set('text', text)} />
        </header>
    )
};

export default HeaderBlockComponentView;