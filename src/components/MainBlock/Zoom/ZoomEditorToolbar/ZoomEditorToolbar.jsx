import React, { useState, useEffect, useRef } from 'react';
import ZoomSlider from '../ZoomSlider/ZoomSlider'
import styles from './ZoomEditorToolbar.module.scss';
import imageIcon from './zoom.svg';
import applyIcon from './apply.svg';
import addAndUpdateMainBlock from '../../function/addAndUpdateMainBlock';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../../utilities';

import getMainblockStyle from '../../function/getMainblockStyle';

const ZoomEditorToolbar = ({ editorState, setEditorState }) => {

    const [show, setShow] = useState(false);
    const [rate, setRate] = useState({});

    const ref = useRef();
    const blockSetupRef = useRef();

    const handleZoomChange = (rate) => {
        console.log("rate", rate)
        const rateStyle = {
            transform: `scale(${rate})`,
        }
        const newEditorState = addAndUpdateMainBlock({ editorState, style: rateStyle })
        setEditorState(newEditorState)
    }


    useEffect(() => {
        const currentBlockStyle = getMainblockStyle({ editorState });
        let rateScale;
    
        if (currentBlockStyle) {
            rateScale = currentBlockStyle.transform;
    
            // Kiểm tra nếu rateScale có dạng scale(${rate})
            if (rateScale && rateScale.startsWith("scale(")) {
                // Lấy giá trị rate từ chuỗi scale(${rate})
                const match = rateScale.match(/scale\(([^)]+)\)/);
                if (match && match[1]) {
                    rateScale = parseFloat(match[1]); // Chuyển rate thành số
                } else {
                    rateScale = 1; // Giá trị mặc định nếu không tìm thấy rate
                }
            } else {
                rateScale = 1; // Giá trị mặc định nếu không có transform
            }
        } else {
            rateScale = 1; // Giá trị mặc định nếu không có blockStyle
        }
    
        setRate(rateScale)
    }, [editorState]);

    useOnClickOutside(ref, () => setShow(false));
    useAutoAdjustAbsolutePosition(blockSetupRef, show);

    return (
        <div ref={ref} className={styles.container}>
            <button className={styles.button} onMouseDown={() => setShow(true)}>
                <img src={imageIcon} alt="Zoom" title='Zoom' className={`${styles.img} ${styles.active}`} />
            </button>
            {show &&
                <div ref={blockSetupRef} className={styles.formContainer}>
                    <ZoomSlider
                        initialZoom={rate*100}
                        onChange={handleZoomChange}
                    ></ZoomSlider>
                </div>

            }
        </div>
    )
}

export default ZoomEditorToolbar 