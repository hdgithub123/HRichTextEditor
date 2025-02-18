import { findTableIdBlocks } from './ultils';
import replaceDatasTable from './replaceDatasTable';
import {convertFromRaw } from 'draft-js';

const replaceDatasTables =  ({ contentStateObjectJS, dataTables }) => {
    let contentState = convertFromRaw(contentStateObjectJS);
    dataTables.forEach(dataTable => {
        contentState = replaceDatasTable({ contentState, tableData:dataTable })
      });

    return contentState;

}

export default replaceDatasTables;