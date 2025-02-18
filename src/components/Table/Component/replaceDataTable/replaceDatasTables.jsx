import { findTableIdBlocks } from './ultils';
import replaceDatasTable from './replaceDatasTable';
import {convertFromRaw } from 'draft-js';

const replaceDatasTables =  ({ contentStateObjectJS, dataTables }) => {
  console.log("replaceDatasTables222222", contentStateObjectJS)
  console.log("dataTables2222222222",dataTables)
    let contentState = convertFromRaw(contentStateObjectJS);
    dataTables.forEach(dataTable => {
        contentState = replaceDatasTable({ contentState, tableData:dataTable })
      });

    return contentState;

}

export default replaceDatasTables;