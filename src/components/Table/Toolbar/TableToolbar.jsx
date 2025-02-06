import getMergecell from '../Component/Changecell/getMergecell';
import getUnMergecell from '../Component/Changecell/getUnMergecell';
import deleteColumn from '../Component/Changecell/deleteColumn';
import deleteRow from '../Component/Changecell/deleteRow';
import insertLeftColumn from '../Component/Changecell/insertLeftColumn';
import insertRightColumn from '../Component/Changecell/insertRightColumn';
import insertBeforeRow from '../Component/Changecell/insertBeforeRow';
import insertAfterRow from '../Component/Changecell/insertAfterRow';
import CreateNewTable from '../Component/CreateTable/CreateNewTable';


const TableToolbar = ({editorState, onChange}) => {
    return (
        <div>
            <CreateNewTable editorState={editorState} onChange={onChange} />
            <button onClick={() => getMergecell({editorState: editorState, onChange})}>Merge Cell</button>
            <button onClick={() => getUnMergecell({editorState: editorState, onChange})}>UnMerge Cell</button>
            <button onClick={() => deleteColumn({editorState: editorState, onChange})}>Delete Column</button>
            <button onClick={() => deleteRow({editorState: editorState, onChange})}>Delete Row</button>
            <button onClick={() => insertLeftColumn({editorState: editorState, onChange})}>Insert Left Column</button>
            <button onClick={() => insertRightColumn({editorState: editorState, onChange})}>Insert Right Column</button>
            <button onClick={() => insertBeforeRow({editorState: editorState, onChange})}>Insert Before Row</button>
            <button onClick={() => insertAfterRow({editorState: editorState, onChange})}>Insert After Row</button>
        </div>
    )   


}

export default TableToolbar;