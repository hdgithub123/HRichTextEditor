import CreateTableView from '../Component/CreateTable/CreateTableView';
import ControlTable from '../ControlTable/ControlTable';
import ChangeCellsStyleView from '../Component/ChangeCellsStyle/ChangeCellsStyleView/ChangeCellsStyleView'
const TableToolbar = ({editorState, setEditorState, onChange}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <CreateTableView editorState={editorState} onChange={onChange}/>
            <ControlTable editorState={editorState} onChange={onChange} />
            <ChangeCellsStyleView editorState={editorState} setEditorState={setEditorState} />
        </div>
    )   
}

export default TableToolbar;