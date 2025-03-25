// viết 1 Component để tạo 1 HeaderBlock mới// viết 1 Component để tạo 1 HeaderBlock mới
import React, { useState, useEffect, useRef } from 'react';
import { EditorState } from 'draft-js';
import imageIcon from './documentHeader.svg'
import addAndUpdateHeaderBlock from '../function/addAndUpdateHeaderBlock';
import styles from './HeaderBlockToolBar.module.scss';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';


const HeaderBlockToolBar = ({ editorState, setEditorState }) => {
    const [show, setShow] = useState(false);
    const blockStyleRef = useRef();
    const ref = useRef();

    const style = {
        height: '20mm',
        background: 'white',
        borderBottom : '5px dashed blue',
        borderTop : '5px dotted gray',
        marginLeft: '10mm',
      //  width: '190mm',
    }
    const handleAddHeaderBlock = () => {
        const newEditorState = addAndUpdateHeaderBlock({ editorState, blockStyle: style });
        setEditorState(newEditorState);
    };

    const handleShow = () => {
        setShow(true);
    };


    useOnClickOutside(ref, () => {
        setShow(false);
    });

    useAutoAdjustAbsolutePosition(blockStyleRef, show);

    return (
        <div ref={ref} className={styles.container}>
            <button onMouseDown={handleShow}>
                <img src={imageIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
            </button>
            {show && (
                <div ref={blockStyleRef} className={styles.formContainer}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Padding Top: </td>
                                <td>
                                    <input type="number" name="paddingTop" value={style.paddingTop} disabled={style.paddingTop === 'auto'} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.applyButton}>
                        <button onMouseDown={handleAddHeaderBlock}>
                            <img src={imageIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
                            <span>Apply</span>
                        </button>

                    </div>
                </div>)}
        </div>
    );
};

export default HeaderBlockToolBar;