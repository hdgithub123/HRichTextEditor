const dynamicText = [
    'idText1',
    'idText2',
    'idText3',
    'idText4',
    'idText5',
    'idText6',
    'idText7',
    'idText8',
    'idText9',
    'idText10',
    'idText11',
    'idText12',
    'idText13',
    'idText14',
    'idText15',
    'idText16',
    'idText17',
    'idText18',
    'idText19',
    'idText20',
]
import React, { useEffect, useState, useRef } from 'react';
import insertText from "../function/insertText"
import imageIcon from './textPoint.svg';
import insertIcon from './insertText.svg'
import style from './DynamicText.module.scss'
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';



const DynamicText = ({ editorState, setEditorState }) => {
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
                ))}</div>
            }
        </div>
    );
};

export default DynamicText;