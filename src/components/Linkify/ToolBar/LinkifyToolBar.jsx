import React, { useState, useEffect, useRef } from 'react';
import style from './LinkifyToolBar.module.scss'
import useOnClickOutside from '../../utilities/useOnClickOutside';
import addLink from "../function/addLink";
import removeLink from '../function/removeLink'
import linkIcon from './link.svg';
import unlinkIcon from './unlink.svg'
import linkAddIcon from './linkAdd.svg'

import { EditorState, RichUtils } from 'draft-js';

const LinkifyToolBar = ({ editorState, setEditorState }) => {
    const [active, setActive] = useState(style.active);
    const [show, setShow] = useState(false);
    const insertRef = useRef();
    const [disabled, setDisabled] = useState(false);
    const [url, setUrl] = useState('');

    useOnClickOutside(insertRef, () => {
        setShow(false);
    });

    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };



    const handleInsertClick = () => {
        addLink({ url, editorState, setEditorState });
        setUrl('')
    };

    const handleRemoveLink = () => {
        removeLink({ editorState, setEditorState });
    }


    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    return (
        <div className={style.container}>
            <div ref={insertRef} className={style.insertLinkContainer}>
                <button onClick={handleClick}>
                    <img src={linkIcon} alt="Link" title="Link" className={`${style.img} ${style.active}`} />
                </button>

                {show && <div className={style.insertLink}>

                    <input
                        type="text"
                        value={url}
                        onChange={handleInputChange}
                        placeholder={'Insert link'}
                    />
                    <button onClick={handleInsertClick}>
                        <img src={linkAddIcon} alt="Add Link" title="Add Link" className={`${style.img} ${style.active}`} />
                    </button>
                </div>}

            </div>
            <button className={style.buttonremoveLink} onClick={handleRemoveLink}>
                <img src={unlinkIcon} alt="RemoveLink" title="RemoveLink" className={`${style.img} ${style.active}`} />
            </button>
        </div>
    );
};

export default LinkifyToolBar;