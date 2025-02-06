import { findTableIdBlocks } from './ultils';
import replaceDataTable from './replaceDataTable';


const replaceDataTables =  ({ editorState, tableData }) => {
    const blockMapJS = editorState.getCurrentContent().getBlockMap().toJS();
    const allBlock =findTableIdBlocks({ blockMapJS: blockMapJS, tableId: tableData.tableId });
    console.log("dsad")
    // Lấy ra tất cả tableKey của các block nếu trùng nhau thì loại đi
    const tableKeys = [...new Set(allBlock.map(block => block.data.tableKey))];
    let newEditorState = editorState;
    for (const tableKey of tableKeys) {
        newEditorState =  replaceDataTable({ editorState: newEditorState, tableData, tableKey });
    }
    return newEditorState;

}

export default replaceDataTables;