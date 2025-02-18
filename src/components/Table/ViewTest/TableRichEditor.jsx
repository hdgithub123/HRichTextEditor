import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Editor, EditorState, Modifier, EditorBlock, SelectionState, ContentBlock, ContentState, genKey, convertToRaw,convertFromRaw } from 'draft-js';

import { RichUtils } from 'draft-js';


import { customStyleMap } from './data';
import { contentExample, contentExample2, tableData,tableData1,tableData2 } from './data'
import { cellData1, cellData2, cellDataEmpty, dataTableStructure, cellsData, tableKey } from './data';

import insertTableStructure from '../Component/tableStructure/insertTableStructure';
import getBlockRendererFn from '../MainComponent/getBlockRendererFn';

import insertCells from '../Component/cellTable/insertCells';
import insertCell from '../Component/cellTable/insertCell';



import TableToolbar from '../TableToolBar/TableToolbar';
import replaceDataTable from '../Component/replaceDataTable/replaceDataTable';
import replaceDatasTable from '../Component/replaceDataTable/replaceDatasTable';
import replaceDatasTables from '../Component/replaceDataTable/replaceDatasTables';





const insertDemoTable = (editorState, onChange) => {
    const newEditorState = insertTableStructure(editorState, tableKey, dataTableStructure);
    onChange(newEditorState);
};


const TableRichEditorNew = () => {
    const editorRef = useRef(null);
    const newEditorRef = useRef(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const onChange = useCallback((newState) => {
        setEditorState(newState);
    }, []);

  

    const handleCellClick = (size) => {
        insertTable(editorState, onChange, size);
    };

    const handleReturn = (e, editorState) => {
        if (RichUtils.getCurrentBlockType(editorState) === 'cellTable') {
            onChange(RichUtils.insertSoftNewline(editorState));
            return 'handled';
        }
        return 'not-handled';
    };

    
    const handleShowSelection = () => {
        console.log(`Selection: ${JSON.stringify(editorState.getSelection().toJS(), null, 2)}`);
        const selectedBlocks = getSelectedTableBlocks(editorState);
        console.log("selectedBlocks", selectedBlocks);
    };

    const insertOneCell = (editorState) => {
        // let newEditorState = insertCell(editorState, cellData1)
        // setEditorState(newEditorState);
        moveSelectionToStart();
        // console.log("aaaa")
    }

    const insertMoreCell = (editorState) => {
        let newEditorState = insertCells(editorState, cellsData)
        setEditorState(newEditorState);
    }


    const [newEditorState, setNewEditorState] = useState(EditorState.createEmpty());

    //const newEditorState = EditorState.createWithContent(editorState.getCurrentContent());

    
    const handleReplaceDataTable = async () => {
        const tableKey = "43cm4";
        const newEditor = await replaceDataTable({editorState, tableData, tableKey});
        console.log("newEditor", newEditor);
    //    const newEditor = replaceDataTable({editorState, tableData, tableKey, onChange});
        setEditorState(newEditor);
    }

    // quan trong da update de khong bi delay
    const handleReplaceDataTables = async () => {
        const newContentState = replaceDatasTables({ contentStateObjectJS: contentExample,dataTables: tableData });
        const newEditor2 = EditorState.createWithContent(newContentState);
        setEditorState(newEditor2);
        await new Promise(resolve => setTimeout(resolve, 0)); // Đảm bảo setEditorState hoàn thành trước khi focus
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };


    const moveSelectionToStart = (editorState) => {
        const firstBlockKey = editorState.getCurrentContent().getFirstBlock().getKey();
        const newSelection = SelectionState.createEmpty(firstBlockKey);
        const newEditorState = EditorState.forceSelection(editorState, newSelection);
        // setEditorState(newEditorState);
        // focusEditor();
        return newEditorState
    };


    const focusEditor = () => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const insertExampleTable = () => {
        const contentState = convertFromRaw(contentExample);
        setEditorState(EditorState.createWithContent(contentState));
    }

    const viewNewEditor = () => {
        setNewEditorState(EditorState.createWithContent(editorState.getCurrentContent()))
    }

    const newViewNewEditor = async () => {
        const tableKey = "43cm4";
       const newEditor = "";
        setNewEditorState(await replaceDataTable({editorState, tableData, tableKey}));
        //setEditorState(newEditorState);
    }
    const onChange2 = useCallback((newState) => {
        setNewEditorState(newState);
    }, []);


    const applyInlineStyle = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
      };

    return (
        <div>
            <button onClick={() => insertDemoTable(editorState, onChange)}>Insert Table</button>
            <button onClick={() => insertOneCell(editorState)}>Insert 1 cell</button>
            <button onClick={() => insertMoreCell(editorState)}>Insert n cell</button>
            <button onClick={insertExampleTable}>Insert example Table</button>
            <button onClick={handleShowSelection}>Show Selection</button>
            <button onClick={handleReplaceDataTable}>replace Data Table</button>
            <button onClick={handleReplaceDataTables}>replace Data Tables</button>
            <br />
            
            <TableToolbar editorState = {editorState} onChange={onChange}></TableToolbar>
            <div> EDITOR </div>
            <Editor
                ref={editorRef}
                editorState={editorState}
                blockRendererFn={getBlockRendererFn({editorRef: editorRef.current, getEditorState:() => editorState, onChange:onChange})}
                onChange={onChange}
                handleReturn={(e, editorState) => handleReturn(e, editorState)}
                placeholder="Tell a story..."
            />
            <div> VIEW Editor</div>
            <button onClick={viewNewEditor}>View EDITOR</button>
            <button onClick={newViewNewEditor}> New View EDITOR</button>
            <button onClick={() => applyInlineStyle('BOLD')} style={{ marginRight: '10px' }}>
          Bold
        </button>
        <button onClick={() => applyInlineStyle('ITALIC')} style={{ marginRight: '10px' }}>
          Italic
        </button>

            <Editor
                ref={newEditorRef}
                editorState={newEditorState}
                blockRendererFn={getBlockRendererFn({editorRef: newEditorRef.current, getEditorState:() => editorState, onChange:onChange, isEditable:false})}
                readOnly={true}
                customStyleMap={customStyleMap}
            />

            <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
        </div>
    );
};

export default TableRichEditorNew;
