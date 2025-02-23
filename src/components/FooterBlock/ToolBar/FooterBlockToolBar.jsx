// viết 1 Component để tạo 1 HeaderBlock mới// viết 1 Component để tạo 1 HeaderBlock mới
import React from 'react';
import { EditorState } from 'draft-js';
import imageIcon from './documentFooter.svg'
import addFooterBlock from '../function/addFooterBlock';
import styles from './FooterBlockToolBar.module.scss';

const FooterBlockToolBar = ({ editorState, setEditorState }) => {
    const handleAddFooterBlock = () => {
        const newEditorState = addFooterBlock({ editorState });
        setEditorState(newEditorState);
    };

    return (
        <div className={styles.toolbar}>
            <button onMouseDown={handleAddFooterBlock}>
                <img src={imageIcon} alt="Footer" title="Footer" className={`${styles.img} ${styles.active}`} />
            </button>
        </div>
    );
};

export default FooterBlockToolBar;