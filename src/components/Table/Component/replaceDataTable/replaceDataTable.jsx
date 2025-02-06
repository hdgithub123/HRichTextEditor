import changeBlockTableShape from './changeBlockTableShape';
import changeBlockTableText from './changeBlockTableText';
import changeEditorStateWithRowSpan from './changeEditorStateWithRowSpan';


const replaceDataTable = async ({ editorState, tableData, tableKey }) => {
    const newEditorStateWithoutRowSpan = await changeEditorStateWithRowSpan({ editorState, tableData, tableKey });
    const newEditorState =  changeBlockTableShape({ editorState:newEditorStateWithoutRowSpan, tableData, tableKey });
    const newEditorStateforChangeBlock =  changeBlockTableText({ editorState: newEditorState, tableData, tableKey });
    return newEditorStateforChangeBlock;
}

export default replaceDataTable;