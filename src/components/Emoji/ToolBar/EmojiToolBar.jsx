import React, { useEffect, useState, useRef } from 'react';
import emojiList from '../emojiList'
import insertEmoji from '../insertEmoji'
import styles from './EmojiToolBar.module.scss';
import imageIcon from './smile.svg'
import { useOnClickOutside,  } from '../../utilities'

const EmojiToolBar = ({ editorState, setEditorState }) => {
    const [show, setShow] = useState(false);
    const ref = useRef();

    const handleonClick = (emoji) => {
        insertEmoji({ emoji, editorState, setEditorState })
    }

    useOnClickOutside(ref, () => {
        setShow(false);
    });

    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };


    return (
        <div ref={ref} className={styles.container}>
            <button onMouseDown={handleClick}>
                <img src={imageIcon} alt="Edit Table" title="Edit Table" className={`${styles.img} ${styles.active}`} />
            </button>
            {show &&<div className={styles.controlTable}>
                {emojiList.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => handleonClick(emoji)}
                    >
                        {emoji}
                    </button>
                ))}
            </div>}
        </div>
    );
};

export default EmojiToolBar;