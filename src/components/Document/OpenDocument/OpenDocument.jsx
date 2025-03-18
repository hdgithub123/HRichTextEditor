import React from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import style from './OpenDocument.module.scss';
import imageIcon from './openFolder.svg'
import decorateEditorState from '../../HRichTextMain/functionRender/decorateEditorState';

const OpenDocument = ({ onChange, functionList }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const contentStateObject = JSON.parse(e.target.result);
                const newContentState = convertFromRaw(contentStateObject);
                let newEditorState = EditorState.createWithContent(newContentState);
                newEditorState = decorateEditorState({ editorState: newEditorState, functionList });
                onChange(newEditorState);
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
