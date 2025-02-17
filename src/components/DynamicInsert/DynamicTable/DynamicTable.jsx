
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
import React, { useState } from 'react';

const DynamicTable = ({ editorState, setEditorState }) => {
    const [selectedKey, setSelectedKey] = useState(Object.keys(dynamicTable)[0]);

    const handleInsertText = (text) => {
        if (!text || text === '') {

        } else {
            const wrappedText = `{{${text}}}`;
            const newEditorState = insertText({ editorState, text: wrappedText });
            setEditorState(newEditorState);
        }

    };

    const handleTextChange = (text) => {
        const wrappedText = `{{${text}}}`;
        const newEditorState = insertText({ editorState, text: wrappedText });
        setEditorState(newEditorState);
    };

    return (
        <DynamicDropdown dynamicTable={dynamicTable} onInsert={handleTextChange} ></DynamicDropdown>
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
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            {/* Dropdown chọn key */}
            <label>Choose a table key: </label>
            <select value={selectedKey} onChange={handleKeyChange}>
                <option value="">-- Select Key --</option>
                {Object.keys(dynamicTable).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>

            {/* Dropdown chọn field (hiện khi đã chọn key) */}
            {selectedKey && (
                <>
                    <label style={{ marginLeft: "20px" }}>Choose a field: </label>
                    <select value={selectedField} onChange={handleFieldChange}>
                        <option value="">-- Select Field --</option>
                        {dynamicTable[selectedKey].map((field) => (
                            <option key={field} value={field}>
                                {field}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {/* Nút Insert */}
            <button onClick={handleInsertClick} style={{ marginLeft: "20px" }}>
                Insert
            </button>
        </div>
    );
};

