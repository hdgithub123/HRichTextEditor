import CreateTableView from '../Component/CreateTable/CreateTableView';
import ControlTable from './ControlTable';

const TableToolbar = ({editorState, onChange}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <CreateTableView editorState={editorState} onChange={onChange}/>
            <ControlTable editorState={editorState} onChange={onChange} />
        </div>
    )   
}

export default TableToolbar;