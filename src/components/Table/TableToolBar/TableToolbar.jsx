import CreateTableView from '../Component/CreateTable/CreateTableView';
import ControlTable from '../ControlTable/ControlTable';
import ChangeCellsStyleView from '../Component/ChangeCellsStyle/ChangeCellsStyleView/ChangeCellsStyleView'
const TableToolbar = ({editorState, onChange}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <CreateTableView editorState={editorState} onChange={onChange}/>
            <ControlTable editorState={editorState} onChange={onChange} />
            <ChangeCellsStyleView editorState={editorState} onChange={onChange}/>
        </div>
    )   
}

export default TableToolbar;