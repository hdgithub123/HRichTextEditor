import React, { useRef, useEffect } from 'react';
import { EditorBlock } from 'draft-js';
import style from './HeaderBlockComponent.module.scss'


const HeaderBlockComponent = props => {
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
        <header id={'hrteHeaderID'}  title='Header' className={style.headerContainer} style={{ ...blockStyle ,}}>
            <EditorBlock {...props} block={block.set('text', text)} />
        </header>
    )
};

export default HeaderBlockComponent;