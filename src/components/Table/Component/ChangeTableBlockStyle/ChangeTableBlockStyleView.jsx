import updateBlockStyleFromBlockKey from '../../../utilities/updateBlockStyleFromBlockKey';
import React, { useEffect, useState, useRef } from 'react';
import { useAutoAdjustAbsolutePosition, useOnClickOutside, getCurrentBlockType } from '../../../utilities';
import styles from './ChangeTableBlockStyleView.module.scss';
import changeTableBlockStyle from '../utilities/changeTableBlockStyle';
import tableSettingIcon from './tableSetting.svg';
import tableCenterIcon from './tableCenter.svg';
import tableMoveLeftIcon from './tableMoveLeft.svg';
import tableMoveRightIcon from './tableMoveRight.svg';
import { EditorState, Modifier } from 'draft-js';

const ChangeTableBlockStyleView = ({ editorState, onChange, listRef }) => {
    const [active, setActive] = useState(styles.active);
    const [show, setShow] = useState(false);
    const [maxRow, setMaxRow] = useState(0);
    const ref = useRef();
    const buttonListRef = useRef();

    const [disabled, setDisabled] = useState(false);

    useOnClickOutside(ref, () => {
        setShow(false);
    });

    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

    const currentBlock = getCurrentBlockType({ editorState });

    useEffect(() => {
        if (currentBlock === "tableStructure" || currentBlock === "cellTable") {
            setActive(styles.active);
            setDisabled(false);
        } else {
            setActive(styles.unactive);
            setDisabled(true);
        }
    }, [currentBlock]);

    useAutoAdjustAbsolutePosition(buttonListRef, show);

    const handleBlockStyleChange = (blockStyle) => {
        const newEditorState = changeTableBlockStyle({ editorState, blockStyle });
        onChange(newEditorState);
    };


    return (
        <div ref={ref} className={styles.container}>
            <button className={styles.button} disabled={disabled} onMouseDown={handleClick}>
                <img src={tableSettingIcon} alt="Table Setting" title="Table Setting" className={`${styles.img} ${active}`} />
            </button>
            {show && (
                <div ref={buttonListRef} className={styles.controlTable}>
                    <div className={styles.buttonAlign} >
                        <button onClick={() => handleBlockStyleChange({ justifyContent: 'left' })}>
                            <img src={tableMoveLeftIcon} alt="Table Align Left" title="Table Align Left" className={`${styles.img} ${active}`} />
                        </button>
                        <button onClick={() => handleBlockStyleChange({ justifyContent: 'center' })}>
                            <img src={tableCenterIcon} alt="Table Align Center" title="Table Align Center" className={`${styles.img} ${active}`} />
                        </button>
                        <button onClick={() => handleBlockStyleChange({ justifyContent: 'right' })}>
                            <img src={tableMoveRightIcon} alt="Table Align Right" title="Table Align Right" className={`${styles.img} ${active}`} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeTableBlockStyleView;

