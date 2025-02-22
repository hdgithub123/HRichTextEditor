// viết 1 Component để tạo 1 HeaderBlock mới// viết 1 Component để tạo 1 HeaderBlock mới
import React from 'react';
import { EditorState } from 'draft-js';
import addHeaderBlock from '../function/addHeaderBlock';
import styles from './HeaderBlockToolBar.module.scss';

const HeaderBlockToolBar = ({ editorState, setEditorState }) => {
    const handleAddHeaderBlock = () => {
        const newEditorState = addHeaderBlock({editorState});
        const blockMap = newEditorState.getCurrentContent().getBlockMap().toJS();
        console.log("blockMap", blockMap);
        // console.log("newEditorState",newEditorState)
        setEditorState(newEditorState);
    };

    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={handleAddHeaderBlock}>
                Add Header Block
            </button>
        </div>
    );
};

export default HeaderBlockToolBar;