import { genKey } from "draft-js";
import insertTableStructure from '../tableStructure/insertTableStructure';
import insertCells from '../cellTable/insertCells';
import { tableStyleDefault, cellStyleDefault } from './stylesTableDefault';
import TableGrid from "./TableGrid";



const CreateTable = async ({editorState, onChange, size, tablestyle , cellStyle, tableAlign})=>{
    const tableKey = genKey();
    const { cols, rows } = size;

    const tableShape = [];
    const cellsData = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const cell = { columnspan: 1, rowspan: 1 };
            row.push(cell);

            const cellData = {
                text: ' ',
                tableKey: tableKey,
                cellPosition: `${tableKey}-${i}-${j}`,
            };
            cellsData.push(cellData);
        }
        tableShape.push(row);
    }

    const dataTableStructure = {
        tablestyle: tablestyle? tablestyle : tableStyleDefault,
        cellStyle: cellStyle? cellStyle:  cellStyleDefault,
        tableShape: tableShape,
        tableAlign: tableAlign? tableAlign : 'center',
        tableColumnWidth: {},
    };
   
    let newEditorState = await insertTableStructure(editorState,tableKey, dataTableStructure);
    if (!newEditorState) return editorState;
    newEditorState =  await insertCells(newEditorState, cellsData);
    onChange(newEditorState);
}


const CreateNewTable = ({editorState, onChange, tablestyle , cellStyle, tableAlign}) => {
    const handleCellClick = (size) => {
        CreateTable({editorState, onChange, size, tablestyle , cellStyle, tableAlign});
    }
        return (
            <div>
                 <TableGrid handleSubmit={handleCellClick} maxGridSize={10} />
            </div>
        )
}


export default CreateNewTable;