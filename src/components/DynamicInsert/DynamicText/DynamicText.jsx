import React, { useEffect, useState, useRef } from 'react';
import insertText from "../function/insertText"
import imageIcon from './textPoint.svg';
import insertIcon from './insertText.svg'
import style from './DynamicText.module.scss'
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';
import changeDynmaticText from '../function/changeDynmaticText'

const DynamicText = ({ editorState, setEditorState, dynamicTexts }) => {
    if(!dynamicTexts){
        setEditorState(editorState)
    }
    const dynamicText = Object.keys(dynamicTexts);
    const [show, setShow] = useState(false);
    const ref = useRef();
    const buttonListRef = useRef();
    const handleInsertText = (text) => {
        const wrappedText = `{{${text}}}`;
        const newEditorState = insertText({ editorState, text: wrappedText });
        setEditorState(newEditorState);
    };

    const handleClick = () => {
        setShow(true)
    }
    useOnClickOutside(ref, () => {
        setShow(false);
    });
    useAutoAdjustAbsolutePosition(buttonListRef, show)

    return (
        <div ref={ref} className={style.container}>
            <button className={style.button} onMouseDown={handleClick}>
                <img src={imageIcon} alt="Text PlaceHolder" title="Text PlaceHolder" className={`${style.img} ${style.active}`} />
            </button>
            {show && <div ref={buttonListRef} className={style.controlTable}>
                {dynamicText.map((text, index) => (
                    <button title='Insert PlaceHolder' key={index} onClick={() => handleInsertText(text)}>
                        <img src={insertIcon} alt="Apply" className={`${style.img} ${style.active}`} />
                        <span>{`{{${text}}}`}</span>
                    </button>
                ))}
                <button onClick={()=> setEditorState(changeDynmaticText({editorState, dataDynamicText:dynamicTexts}))}> chay thu</button>
            </div>
            }
        </div>
    );
};

export default DynamicText;