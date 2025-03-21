import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import imageIcon from './newDocument.svg'
import styles from './CreateEmptyEditor.module.scss'
import addAndUpdateMainBlockStyle from '../../MainBlock/addAndUpdateMainBlock';
import getMainblockStyle from '../../MainBlock/getMainblockStyle';
import { defaultEditorStyle } from '../../_constant/_constant'



const CreateEmptyEditor = ({editorState,setEditorState}) => {
    const handleClick = () =>{
        const blockStyle = getMainblockStyle({ editorState });
        let newEditorState = EditorState.createEmpty();
        newEditorState= addAndUpdateMainBlockStyle({ editorState: newEditorState, setEditorState, style: blockStyle?blockStyle:defaultEditorStyle });
        setEditorState(newEditorState);
    }

    return (
        <button className={styles.button} onMouseDown={handleClick}>
            <img src={imageIcon} alt="New Document" title="New Document" className={`${styles.img} ${styles.active}`} />
        </button>
    );
};

export default CreateEmptyEditor
