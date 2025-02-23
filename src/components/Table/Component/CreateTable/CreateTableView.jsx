import React, { useEffect, useState, useRef } from 'react';
import { genKey } from "draft-js";
import insertTableStructure from '../tableStructure/insertTableStructure';
import insertCells from '../cellTable/insertCells';
import { tableStyleDefault, cellStyleDefault, blockStyleDefault } from './stylesTableDefault';
import TableGrid from "./TableGrid";
import styles from './CreateNewTable.module.scss';
import imageIcon from './table.svg'
import useOnClickOutside from '../../../utilities/useOnClickOutside';
import getCurrentBlock from '../../../utilities/getCurrentBlockType';
import { useAutoAdjustAbsolutePosition } from '../../../utilities';

const createTable = async ({ editorState, onChange, size, tablestyle = tableStyleDefault, cellStyle = cellStyleDefault, blockStyle = blockStyleDefault, maxHeaderRow = 0 }) => {
    const tableKey = genKey();
    const { cols, rows } = size;

    const tableShape = [];
    const cellsData = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const cell = { columnspan: 1, rowspan: 1, individualStyle: {} }; // cell data
            row.push(cell);

            const cellData = {
                text: ' ',
                tableKey: tableKey,
                cellPosition: `${tableKey}-${i}-${j}`,
            };
            cellsData.push(cellData);
        }
        tableShape.push(row);
    }

    const dataTableStructure = {
        tablestyle: tablestyle ? tablestyle : {},
        cellStyle: cellStyle ? cellStyle : {},
        maxHeaderRow: maxHeaderRow ? maxHeaderRow : '0',
        tableShape: tableShape,
        blockStyle: blockStyle ? blockStyle : {},
        tableColumnWidth: {},
    };

    let newEditorState = await insertTableStructure(editorState, tableKey, dataTableStructure);
    if (!newEditorState) return editorState;
    newEditorState = await insertCells(newEditorState, cellsData);
    onChange(newEditorState);
}



const CreateTableView = ({ editorState, onChange, tablestyle, cellStyle, blockStyle }) => {
    const [active, setActive] = useState(styles.unactive);
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [maxHeaderRow, setMaxHeaderRow] = useState('1');
    const ref = useRef();
    const TableGridref = useRef();

    const currentBlock = getCurrentBlock({ editorState });

    useEffect(() => {
        if (currentBlock === "tableStructure" || currentBlock === "cellTable") {
            setActive(styles.unactive)
            setDisabled(true)
        } else {
            setActive(styles.active)
            setDisabled(false)
        }
    }, [currentBlock]);



    const handleCellClick = (size) => {
        createTable({ editorState, onChange, size, tablestyle, cellStyle, blockStyle, maxHeaderRow: maxHeaderRow });
    }

    useOnClickOutside(ref, () => {
        setShow(false);
    });

    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

    useAutoAdjustAbsolutePosition(TableGridref, show)
    return (
        <div ref={ref} className={styles.tableContainer}>
            <button className={styles.button} disabled={disabled} onMouseDown={handleClick}>
                <img src={imageIcon} alt="Create Table" title="Create Table" className={`${styles.img} ${active}`} />
            </button>
            {show && <div ref={TableGridref} className={styles.dropdown} >
                <div className={styles.tableGrid} >
                    <TableGrid handleSubmit={handleCellClick} maxGridSize={10} />
                </div>
                <div className={styles.maxHeaderRow}>
                    <span>Max Header Row:</span>
                    <input
                        type="number"
                        min = {0}
                        placeholder='Max Header Row'
                        value={maxHeaderRow}
                        onChange={(e) => { setMaxHeaderRow(parseInt(e.target.value, 10) || 0); }}
                    />
                </div>
            </div>
            }
        </div>

    )
}


export default CreateTableView;