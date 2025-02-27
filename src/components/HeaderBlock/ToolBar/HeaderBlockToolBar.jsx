// viết 1 Component để tạo 1 HeaderBlock mới// viết 1 Component để tạo 1 HeaderBlock mới
import React from 'react';
import { EditorState } from 'draft-js';
import imageIcon from './documentHeader.svg'
import addHeaderBlock from '../function/addHeaderBlock';
import styles from './HeaderBlockToolBar.module.scss';

const HeaderBlockToolBar = ({ editorState, setEditorState }) => {

    const style = {
        height: '20mm',
        background: 'red',
    }
    const handleAddHeaderBlock = () => {
        const newEditorState = addHeaderBlock({editorState, blockStyle :style });
        setEditorState(newEditorState);
    };

    return (
        <div className={styles.toolbar}>
            <button onMouseDown={handleAddHeaderBlock}>
                <img src={imageIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
            </button>
        </div>
    );
};

export default HeaderBlockToolBar;