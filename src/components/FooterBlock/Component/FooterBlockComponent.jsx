import React, { useRef, useEffect } from 'react';
import { EditorBlock } from 'draft-js';
import style from './FooterBlockComponent.module.scss'


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
        <footer title='Footer' className={style.footerContainer} style={{...blockStyle }}>
            <EditorBlock {...props} block={block.set('text', text)} />
        </footer>
    )
};

export default FooterBlockComponent;