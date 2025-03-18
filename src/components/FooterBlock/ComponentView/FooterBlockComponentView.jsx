import React, { useRef, useEffect } from 'react';
import { EditorBlock } from 'draft-js';
import { createPortal } from 'react-dom';
import style from './FooterBlockComponentView.module.scss'


const FooterBlockComponent = props => {
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
        <footer id= 'hrteFooterID' title='Insert Footer' className={style.footerContainer} style={{ whiteSpace: "pre-wrap",...blockStyle }}>
            <EditorBlock {...props} block={block.set('text', text)} />
        </footer>
    )
};

export default FooterBlockComponent;