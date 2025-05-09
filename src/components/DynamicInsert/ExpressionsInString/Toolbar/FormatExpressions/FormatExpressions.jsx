import React, { useEffect, useState, useRef } from 'react';
import insertText from "../../../function/insertText"
import imageIcon from './numberFomat.svg';
import insertIcon from './numberFomat.svg'
import style from './FormatExpressions.module.scss'
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../../../utilities';


const FormatExpressions = ({ editorState, setEditorState, dynamicFormats=[] }) => {
    const dynamicFormat = ["formatNumber","formatVnNumber","formatUsNumber","roundNumber",...dynamicFormats]
    const [show, setShow] = useState(false);
    const ref = useRef();
    const buttonListRef = useRef();
    const handleInsertText = (text) => {
        const wrappedText = `${text}(*,*)`;
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
                <img src={imageIcon} alt="Format Number" title="Format Number" className={`${style.img} ${style.active}`} />
            </button>
            {show && <div ref={buttonListRef} className={style.controlTable}>
                {dynamicFormat.map((text, index) => (
                    <button title='Insert Format Number' key={index} onClick={() => handleInsertText(text)}>
                        <img src={insertIcon} alt="Apply" className={`${style.img} ${style.active}`} />
                        <span>{`${text}(*,*)`}</span>
                    </button>
                ))}
            </div>
            }
        </div>
    );
};

export default FormatExpressions;