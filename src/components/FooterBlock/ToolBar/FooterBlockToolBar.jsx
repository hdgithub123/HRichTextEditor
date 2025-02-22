// viết 1 Component để tạo 1 HeaderBlock mới// viết 1 Component để tạo 1 HeaderBlock mới
import React from 'react';
import { EditorState } from 'draft-js';
import addFooterBlock from '../function/addFooterBlock';
import styles from './FooterBlockToolBar.module.scss';

const FooterBlockToolBar = ({ editorState, setEditorState }) => {
    const handleAddHeaderBlock = () => {
        const newEditorState = addFooterBlock({editorState});
        const blockMap = newEditorState.getCurrentContent().getBlockMap().toJS();
        console.log("blockMap", blockMap);
        // console.log("newEditorState",newEditorState)
        setEditorState(newEditorState);
    };

    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={handleAddHeaderBlock}>
                Add Footer Block
            </button>
        </div>
    );
};

export default FooterBlockToolBar;