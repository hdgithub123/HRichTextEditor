
// const dynamicTable2 = {
//     tableID2: [
//         { name: 'Carol dasdasd  đá asdad ', age: 25, address: 'Berlin' },
//         { name: 'David', age: '30dsds', address: 'Tokyo' },
//         { name: 'Eve', age: 27, address: 'Sydney' },
//         { name: 'Frank', age: 35, address: 'Rome' },
//         { name: 'Grace', age: 28, address: 'Moscow' },
//         { name: 'Hank', age: 19, address: 'Toronto' },
//     ],

//     tableID2: [
//         { name: 'Carol dasdasd  đá asdad ', age: 25, address: 'Berlin' },
//         { name: 'David', age: '30dsds', address: 'Tokyo' },
//         { name: 'Eve', age: 27, address: 'Sydney' },
//         { name: 'Frank', age: 35, address: 'Rome' },
//         { name: 'Grace', age: 28, address: 'Moscow' },
//         { name: 'Hank', age: 19, address: 'Toronto' },
//     ]
// }


const dynamicTable = {
    tableID1: ['name', 'age', 'address'],
    tableID2: ['name', 'age', 'address', 'city', 'home'],
}


import insertText from "../function/insertText"
import React, { useState, useRef, useEffect } from 'react';
import imageIcon from './tablePoint.svg';
import applyIcon from './insertText.svg';

import style from './DynamicTable.module.scss'
import { useOnClickOutside, useAutoAdjustAbsolutePosition, getCurrentBlockType } from '../../utilities';


const DynamicTable = ({ editorState, setEditorState, dynamicTables }) => {
    const transformObject = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
            const keysArray = obj[key].flatMap(innerObj => Object.keys(innerObj));
            acc[key] = [...new Set(keysArray)];
            return acc;
        }, {});
    };

    const dynamicTable = transformObject(dynamicTables)
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(true);
    const ref = useRef();
    const buttonListRef = useRef();
    const currentBlockType = getCurrentBlockType({ editorState })

    useEffect(() => {
        if (currentBlockType !== 'cellTable') {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [currentBlockType]);


    const handleTextChange = (text) => {
        if (!text || text === '') {

        } else {
            const wrappedText = `{{${text}}}`;
            const newEditorState = insertText({ editorState, text: wrappedText });
            setEditorState(newEditorState);
        }
    };

    const handleClick = () => {
        setShow(true)
    }
    useOnClickOutside(ref, () => {
        setShow(false);
    });
    useAutoAdjustAbsolutePosition(buttonListRef, show)


    return (<div ref={ref} className={style.tableContainer}>
        <button disabled={disable} className={style.button} onMouseDown={handleClick}>
            <img src={imageIcon} alt="Table PlaceHolder" title="Table PlaceHolder" className={`${style.img} ${style.active}`} />
        </button>
        {show && <div ref={buttonListRef} className={style.controlTable}>
            <DynamicDropdown dynamicTable={dynamicTable} onInsert={handleTextChange} ></DynamicDropdown>
        </div>}
    </div>
    );
};

export default DynamicTable;


const DynamicDropdown = ({ dynamicTable, onInsert }) => {
    const [selectedKey, setSelectedKey] = useState(""); // Lưu key đang chọn
    const [selectedField, setSelectedField] = useState(""); // Lưu field đang chọn

    // Khi chọn key, reset field
    const handleKeyChange = (event) => {
        const newKey = event.target.value;
        setSelectedKey(newKey);
        setSelectedField(""); // Reset field khi đổi key
    };

    // Khi chọn field
    const handleFieldChange = (event) => {
        const newField = event.target.value;
        setSelectedField(newField);
    };

    // Khi nhấn nút Insert
    const handleInsertClick = () => {
        if (onInsert && selectedKey && selectedField) {
            onInsert(`${selectedKey}.${selectedField}`);
        }
    };

    return (
        <div className={style.DynamicDropdownContainer}>
            <table>
                <tbody>
                    <tr>
                        <td>Table ID </td>
                        <td>
                            <select value={selectedKey} onChange={handleKeyChange}>
                                <option value="">-- Select Key --</option>
                                {Object.keys(dynamicTable).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Field:</td>
                        <td>
                            {selectedKey ? <div style={{ background: 'white' }}>
                                <select value={selectedField} onChange={handleFieldChange}>
                                    <option value="">-- Select Field --</option>
                                    {dynamicTable[selectedKey].map((field) => (
                                        <option key={field} value={field}>
                                            {field}
                                        </option>
                                    ))}
                                </select>
                            </div> : <div>

                                <select>
                                    <option value="">-- Select Field --</option>
                                </select>

                            </div>}
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* Nút Insert */}


            <div className={style.applyButton}>
                <button title='Apply' onClick={handleInsertClick}>
                    <img src={applyIcon} alt="Apply" className={`${style.img} ${style.active}`} />
                    <span>Insert</span>
                </button>
            </div>
        </div>
    );
};

