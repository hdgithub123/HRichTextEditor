import React, { useEffect, useState, useRef } from 'react';
import getMergecell from '../Component/Changecell/getMergecell';
import getUnMergecell from '../Component/Changecell/getUnMergecell';
import deleteColumn from '../Component/changeCell/deleteColumn';
import deleteRow from '../Component/changeCell/deleteRow';
import insertLeftColumn from '../Component/Changecell/insertLeftColumn';
import insertRightColumn from '../Component/Changecell/insertRightColumn';
import insertBeforeRow from '../Component/Changecell/insertBeforeRow';
import insertAfterRow from '../Component/Changecell/insertAfterRow';
import styles from './ControlTable.module.scss';
import imageIcon from './tableEdit.svg';
import mergeCellsIcon from './mergeCells.svg';
import unmergeCellsIcon from './unmergeCells.svg';
import deleteColumnIcon from './deleteColumn.svg';
import deleteRowIcon from './deleteRow.svg';
import insertLeftColumnIcon from './insertLeftColumn.svg';
import insertRightColumnIcon from './insertRightColumn.svg';
import insertBeforeRowIcon from './insertRowBefore.svg';
import insertAfterRowIcon from './insertRowAfter.svg';
import getCurrentBlockType from '../../utilities/getCurrentBlockType';


import useOnClickOutside from '../../utilities/useOnClickOutside';


const ControlTable = ({ editorState, onChange }) => {
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

    return (
        <div ref={ref} className={styles.tableContainer}>
            <button className={styles.button} disabled={disabled} onMouseDown={handleClick}>
                <img src={imageIcon} alt="Edit Table" title="Edit Table" className={`${styles.img} ${active}`} />
            </button>
            {show && <div className={styles.controlTable}>
                <button onClick={() => getMergecell({ editorState: editorState, onChange })}>
                    <img src={mergeCellsIcon} alt="Merge Cells" title="Merge Cells" className={`${styles.img} ${active}`} />
                </button>
                <button onClick={() => getUnMergecell({ editorState: editorState, onChange })}>
                    <img src={unmergeCellsIcon} alt="Unmerge Cells" title="Unmerge Cells" className={`${styles.img} ${active}`} />
                </button>
                <button onClick={() => deleteColumn({ editorState: editorState, onChange })}>
                    <img src={deleteColumnIcon} alt="Delete Column" title="Delete Column" className={`${styles.img} ${active}`} />
                </button>
                <button onClick={() => deleteRow({ editorState: editorState, onChange })}>
                    <img src={deleteRowIcon} alt="Delete Row" title="Delete Row" className={`${styles.img} ${active}`} />
                </button>
                <button onClick={() => insertLeftColumn({ editorState: editorState, onChange })}>
                    <img src={insertLeftColumnIcon} alt="Insert Left Column" title="Insert Left Column" className={`${styles.img} ${active}`} />
                </button>
                <button onClick={() => insertRightColumn({ editorState: editorState, onChange })}>
                    <img src={insertRightColumnIcon} alt="Insert Right Column" title="Insert Right Column" className={`${styles.img} ${active}`} />
                </button>
                <button onClick={() => insertBeforeRow({ editorState: editorState, onChange })}>
                    <img src={insertBeforeRowIcon} alt="Insert Before Row" title="Insert Before Row" className={`${styles.img} ${active}`} />
                </button>
                <button onClick={() => insertAfterRow({ editorState: editorState, onChange })}>
                    <img src={insertAfterRowIcon} alt="Insert After Row" title="Insert After Row" className={`${styles.img} ${active}`} />
                </button>
            </div>}
        </div>
    )
}

export default ControlTable;