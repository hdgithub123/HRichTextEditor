import CreateNewTable from '../Component/CreateTable/CreateNewTable';
import ControlTable from './ControlTable';

const TableToolbar = ({editorState, onChange}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <CreateNewTable editorState={editorState} onChange={onChange} />
            <ControlTable editorState={editorState} onChange={onChange} />
        </div>
    )   
}

export default TableToolbar;