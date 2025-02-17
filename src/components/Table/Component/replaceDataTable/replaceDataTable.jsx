import changeBlockTableShape from './changeBlockTableShape';
import changeBlockTableText from './changeBlockTableText';
import changeEditorStateWithRowSpan from './changeEditorStateWithRowSpan';
import { convertToRaw } from 'draft-js';

const replaceDataTable =  ({ contentState, tableData, tableKey }) => {
    const newContentState =  changeEditorStateWithRowSpan({contentState, tableData, tableKey });
    const newContentStateChangeTableShape =  changeBlockTableShape({ contentState:newContentState, tableData, tableKey });
    const newContentStateChangeBlock =  changeBlockTableText({contentState:newContentStateChangeTableShape, tableData, tableKey });
    return newContentStateChangeBlock;
}

export default replaceDataTable;