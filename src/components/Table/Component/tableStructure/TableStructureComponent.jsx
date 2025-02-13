import React, { useCallback, useRef } from 'react';
import {  EditorState, } from 'draft-js';

import style from './TableStructureComponent.module.css';

const TableStructureComponent = props => {
    const table = useRef(null);
    const container = useRef(null);
    const {
        block,
        contentState,
        blockProps: { editorRef, getEditorState, onChange },
    } = props;   
    const data = block.getData().toJS(); // Convert Immutable.Map to JavaScript object
    const tableStyle = data.tablestyle;
    const cellStyle = data.cellStyle;
    // const tableAlign = data.tableAlign;
    const blockStyle = data.blockStyle;
    const tableShape = data.tableShape;
    if (!tableShape) {
        return null;
    }
    const tableColumnWidth = data.tableColumnWidth;

    const updateBlockData = useCallback(
        (newData = {}, data = block.getData()) => {
          data = data.merge(newData);
          const newBlock = block.set('data', data);
          let blockMap = getEditorState().getCurrentContent().getBlockMap();
          blockMap = blockMap.set(block.getKey(), newBlock);
          const newContent = getEditorState().getCurrentContent().set('blockMap', blockMap);
          const selection = getEditorState().getSelection();
          let editorState = EditorState.push(getEditorState(), newContent, 'change-block-data');
          editorState = EditorState.forceSelection(editorState, selection);
          onChange(editorState);
        },
        [block, getEditorState, onChange]
      );


    const handleResize = (e, colIndex) => {
        const startX = e.clientX;
        const startWidth = container.current.querySelectorAll('td')[colIndex].offsetWidth;
    
        const onMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newTableColumnWidth = { ...tableColumnWidth, [colIndex]: `${newWidth}px` };
            updateBlockData({ tableColumnWidth: newTableColumnWidth });
        };
    
        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };
    
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

    return (
        // <div ref={container} style={{justifyContent: tableAlign,  display: 'flex' }}>
        <div ref={container} style={blockStyle}>
            <table key={block.getKey()} style={tableStyle} id={block.getKey()}>
                <tbody>
                    {tableShape.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => {
                                if (Object.keys(cell).length === 0) {
                                    return null; // Do not render empty cells
                                }
                                return (
                                    <td
                                        key={j}
                                        style={{ ...cellStyle,  ...(cell.individualStyle || {}) , width: tableColumnWidth[j]? tableColumnWidth[j] : '100px'}}
                                        className={style.firstcellTable }
                                        colSpan={cell.columnspan || 1}
                                        rowSpan={cell.rowspan || 1}
                                        cell-position={`${block.getKey()}-${i}-${j}`}
                                        onMouseDown={(e) => handleResize(e, j)}
                                    >
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableStructureComponent;