import CreateTableView from '../Component/CreateTable/CreateTableView';
import ControlTable from '../ControlTable/ControlTable';
import ChangeCellsStyleView from '../Component/ChangeCellsStyle/ChangeCellsStyleView/ChangeCellsStyleView'
import ChangeTableBlockStyleView from '../Component/ChangeTableBlockStyle/ChangeTableBlockStyleView'
import style from './TableToolbar.module.scss'

const TableToolbar = ({editorState, onChange}) => {
    return (
        <div className={style.container}>
            <CreateTableView editorState={editorState} onChange={onChange}/>
            <ControlTable editorState={editorState} onChange={onChange} />
            <ChangeCellsStyleView editorState={editorState} onChange={onChange}/>
            <ChangeTableBlockStyleView editorState={editorState} onChange={onChange}></ChangeTableBlockStyleView>
        </div>
    )   
}

export default TableToolbar;