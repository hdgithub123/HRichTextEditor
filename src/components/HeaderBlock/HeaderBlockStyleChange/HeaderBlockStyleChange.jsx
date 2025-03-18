// viết 1 Component để tạo 1 HeaderBlock mới// viết 1 Component để tạo 1 HeaderBlock mới
import React, { useState, useEffect, useRef } from 'react';
import { EditorState } from 'draft-js';
import imageIcon from './documentHeader.svg'
import addHeaderBlock from '../function/addHeaderBlock';
import styles from './HeaderBlockStyleChange.module.scss';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';
import handleUpload from '../../Image/utilities/handleUpload';


const HeaderBlockToolBar = ({  headerStyle,onchange }) => {
    const [styleChange, setStyleChange] = useState(headerStyle?headerStyle: null);

    const blockStyleRef = useRef();
    const ref = useRef();

    const handleChangeStyle =()=>{
        onchange(headerStyleChange)

    }

    const handleHeightChange = (e) =>{
        const newStyle = {
            ...styleChange,
            height: e
        }
        setStyleChange(newStyle)
    }

    return (
        <div ref={blockStyleRef} className={styles.formContainer}>
            <table>
                <tbody>
                    <tr>
                        <td>Padding Top: </td>
                        <td>
                            <input type="number" name="paddingTop" onchange={handleHeightChange} value={style.paddingTop} disabled={style.paddingTop === 'auto'} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.applyButton}>
                <button onMouseDown={handleChangeStyle}>
                    <img src={imageIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
                    <span>Apply</span>
                </button>
            </div>
        </div>
    );
};

export default HeaderBlockToolBar;