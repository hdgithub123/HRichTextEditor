import React, { useState, useEffect, useRef } from 'react';
import ZoomSlider from '../ZoomSlider/ZoomSlider'
import styles from './ZoomEditorToolbar.module.scss';
import imageIcon from './zoom.svg';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../../utilities';


const ZoomEditorToolbar = ({ zoomRate, setZoomRate }) => {

    const [show, setShow] = useState(false);
    const [rate, setRate] = useState({});

    const ref = useRef();
    const blockSetupRef = useRef();

    const handleZoomChange = (rate) => {
        setZoomRate(rate)
    }

    useEffect(() => {
        setRate(zoomRate)
    }, [zoomRate])


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