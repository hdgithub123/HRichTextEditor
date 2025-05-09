import React, { useEffect, useState, useRef } from 'react';
import insertText from "../../../function/insertText"
import imageIcon from './calculator.svg';
import style from './CaculateExpressions.module.scss'

const CaculateExpressions = ({ editorState, setEditorState}) => {
    const ref = useRef();
    const handleInsertText = (text) => {
        const wrappedText = `${text}`;
        const newEditorState = insertText({ editorState, text: wrappedText });
        setEditorState(newEditorState);
    };

    return (
        <div ref={ref} className={style.container}>
            <button className={style.button} onClick={() => handleInsertText("[*]")}>
                <img src={imageIcon} alt="Caculator" title="Caculator" className={`${style.img} ${style.active}`} />
            </button>
        </div>
    );
};

export default CaculateExpressions;