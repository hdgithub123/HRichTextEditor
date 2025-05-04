import React, { useState, useEffect, useRef } from 'react';
import PaperSizePicker from "./PaperSizePicker"
import styles from './PaperSizePickerToolBar.module.scss';
import imageIcon from './paperSize.svg';
import applyIcon from './apply.svg';
import addAndUpdateMainBlock from '../function/addAndUpdateMainBlock';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';


const PaperSizePickerToolBar = ({ editorState, setEditorState }) => {

    const [show, setShow] = useState(false);
    const [size, setSize] = useState({});

    const ref = useRef();
    const blockSetupRef = useRef();

    const handleChangePaperSize = (size) => {
        const newSize = {
            width: size.width,
            height: size.height,
        }
        setSize(newSize)
    }

    const handleSubmit = () =>{
        const newStyle = {
            width: size.width,
            height: 'auto',
        }

        const newPageSetup = {
            pageHeight:size.height
        }
       const newEditorState = addAndUpdateMainBlock({editorState, style:newStyle , pageSetup:newPageSetup, unit:'mm'})
       setEditorState(newEditorState)
    }


    useOnClickOutside(ref, () => setShow(false));
    useAutoAdjustAbsolutePosition(blockSetupRef, show);

    return (
        <div ref={ref} className={styles.container}>
            <button className={styles.button} onMouseDown={() => setShow(true)}>
                <img src={imageIcon} alt="Paper Size" title='Paper Size' className={`${styles.img} ${styles.active}`} />
            </button>
            {show &&
                <div ref={blockSetupRef} className={styles.formContainer}>
                    <PaperSizePicker
                        onChange={handleChangePaperSize}
                    ></PaperSizePicker>
                    <div className={styles.applyButton}>
                        <button onClick={handleSubmit}>
                            <img src={applyIcon} alt="Apply" className={`${styles.img} ${styles.active}`} />
                            <span>Apply</span>
                        </button>
                    </div>
                </div>

            }
        </div>
    )
}

export default PaperSizePickerToolBar 