import React, { useEffect, useState, useRef } from 'react';
import styles from './ChangeCellsStyleView.module.scss';
import changeSelectionCellsStyle from '../../utilities/changeSelectionCellsStyle'
import useOnClickOutside from '../../../../utilities/useOnClickOutside';
import imageIcon from './borderAll.svg';
import getCurrentBlockType from '../../../../utilities/getCurrentBlockType';
import ChangeCellsStyle from '../ChangeCellsStyle/ChangeCellsStyle';


const ChangeCellsStyleView = ({ editorState, onChange }) => {
    const [active, setActive] = useState(styles.active);
    const [show, setShow] = useState(false);
    const ref = useRef();
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
            setActive(styles.active)
            setDisabled(false)
        } else {
            setActive(styles.unactive)
            setDisabled(true)
        }
    }, [currentBlock]);

    
    const handleStyleChange = (e) =>{
       changeSelectionCellsStyle({editorState,onChange, newStyle:e})
    }


    return <div ref={ref} className={styles.tableContainer}>
        <button className={styles.button} disabled={disabled} onMouseDown={handleClick}>
            <img src={imageIcon} alt="Edit Table Border " title="Edit Table Border" className={`${styles.img} ${active}`} />
        </button>
        {show && <div className={styles.controlTable}>
            <ChangeCellsStyle onChange={handleStyleChange}></ChangeCellsStyle>
        </div>}
    </div>

}

export default ChangeCellsStyleView;