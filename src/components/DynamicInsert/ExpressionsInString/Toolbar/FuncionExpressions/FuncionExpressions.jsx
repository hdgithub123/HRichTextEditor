import React, { useEffect, useState, useRef } from 'react';
import insertText from "../../../function/insertText"
import imageIcon from './functionExpress.svg';
import insertIcon from './numberChangeText.svg'
import style from './FuncionExpressions.module.scss'
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../../../utilities';


const FuncionExpressions = ({ editorState, setEditorState, dynamicFunctions = [] }) => {
    const dynamicFunction = ["", "VND", "USD", "VnReadNumber", "EnReadNumber", ...dynamicFunctions]
    const [show, setShow] = useState(false);
    const ref = useRef();
    const buttonListRef = useRef();
    const handleInsertText = (text) => {
        let wrappedText = "";
        if (text === "") {
            wrappedText = `[{*}]`;
        } else {
            wrappedText = `${text}(*)`;
        }

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
                <img src={imageIcon} alt="Function Express" title="Function Express" className={`${style.img} ${style.active}`} />
            </button>
            {show && <div ref={buttonListRef} className={style.controlTable}>
                {dynamicFunction.map((text, index) => (
                    <button title='Function Express' key={index} onClick={() => handleInsertText(text)}>
                        <img src={text !== "" ? insertIcon : imageIcon} alt="Apply" className={`${style.img} ${style.active}`} />
                        <span>{text !== "" ? `${text}(*)`:"[{*}]"}</span>
                    </button>
                ))}
            </div>
            }
        </div>
    );
};

export default FuncionExpressions;