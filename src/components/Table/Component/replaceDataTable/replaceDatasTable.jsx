import { findTableIdBlocks } from './ultils';
import replaceDataTable from './replaceDataTable';
import {convertFromRaw } from 'draft-js';

const replaceDatasTable =  ({ contentState, tableData }) => {
    // const contentState = convertFromRaw(contentStateObjectJS);
    const blockMapJS = contentState.getBlockMap().toJS();
    const allBlock =findTableIdBlocks({ blockMapJS: blockMapJS, tableId: tableData.tableId });
    // Lấy ra tất cả tableKey của các block nếu trùng nhau thì loại đi
    const tableKeys = [...new Set(allBlock.map(block => block.data.tableKey))];
    let newContentState = contentState;
    for (const tableKey of tableKeys) {
        newContentState =  replaceDataTable({ contentState:newContentState, tableData, tableKey });
    }
    return newContentState;

}

export default replaceDatasTable;