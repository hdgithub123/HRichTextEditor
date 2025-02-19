import React, { useState, useEffect } from 'react';
import { Editor, EditorState,convertFromRaw } from 'draft-js';
import imageIcon from './sampleFile.svg'
import styles from './CreateExampleEditor.module.scss'
import {contentStateObjectExample} from '../../_constant/exampleData'
import decorateEditorState from '../../HRichTextMain/functionRender/decorateEditorState'

const CreateExampleEditor = ({contentStateObject= contentStateObjectExample,setEditorState, functionList}) => {

    const handleClick = () =>{
        const newContentState = convertFromRaw(contentStateObject);
        let newEditorState = EditorState.createWithContent(newContentState);
        newEditorState = decorateEditorState({ editorState: newEditorState, functionList:functionList });
        setEditorState(newEditorState);
    }
 
    return (
        <button className={styles.button} onMouseDown={handleClick}>
            <img src={imageIcon} alt="Example Document" title="Example Document" className={`${styles.img} ${styles.active}`} />
        </button>
    );
};

export default CreateExampleEditor
