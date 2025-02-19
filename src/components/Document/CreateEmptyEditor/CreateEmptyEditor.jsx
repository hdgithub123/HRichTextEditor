import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import imageIcon from './newDocument.svg'
import styles from './CreateEmptyEditor.module.scss'


const CreateEmptyEditor = ({setEditorState}) => {
    const handleClick = () =>{
        const newEditorState = EditorState.createEmpty();
        setEditorState(newEditorState);
    }

    return (
        <button className={styles.button} onMouseDown={handleClick}>
            <img src={imageIcon} alt="New Document" title="New Document" className={`${styles.img} ${styles.active}`} />
        </button>
    );
};

export default CreateEmptyEditor
