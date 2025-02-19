// import React, { useState, useEffect } from 'react';
// import { Editor, EditorState,convertFromRaw } from 'draft-js';
// import imageIcon from './openFolder.svg'
// import styles from './CreateExampleEditor.module.scss'
// import {contentStateObjectExample} from '../../_constant/exampleData'
// import decorateEditorState from '../../HRichTextMain/functionRender/decorateEditorState'

// const OpenDocument = ({contentStateObject= contentStateObjectExample,setEditorState, functionList}) => {

//     const handleClick = () =>{
//         const newContentState = convertFromRaw(contentStateObject);
//         let newEditorState = EditorState.createWithContent(newContentState);
//         newEditorState = decorateEditorState({ editorState: newEditorState, functionList:functionList });
//         setEditorState(newEditorState);
//     }

//     return (
//         <button className={styles.button} onMouseDown={handleClick}>
//             <img src={imageIcon} alt="Example Document" title="Example Document" className={`${styles.img} ${styles.active}`} />
//         </button>
//     );
// };

// export default OpenDocument


import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import style from './OpenDocument.module.scss';
import imageIcon from './openFolder.svg'
import decorateEditorState from '../../HRichTextMain/functionRender/decorateEditorState';

const OpenDocument = ({ setEditorState, functionList }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const contentStateObject = JSON.parse(e.target.result);
                const newContentState = convertFromRaw(contentStateObject);
                let newEditorState = EditorState.createWithContent(newContentState);
                newEditorState = decorateEditorState({ editorState: newEditorState, functionList });
                setEditorState(newEditorState);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        reader.readAsText(file);
        event.target.value = null;
    };

    return (
      
            <label className={style.button}>
                <img src={imageIcon} alt="Open File" title="Open File" className={`${style.img} ${style.active}`} />
                <input
                    type="file"
                    accept=".HEditor"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                />
            </label>
      
    );
};

export default OpenDocument;
