const getCellPosition = ({ block }) => {
    // Kiểm tra xem block type của block có phải là cellTable không
    if (block.getType() !== 'cellTable') {
        return null;
    }

    // Lấy cellPosition từ data của block
    const data = block.getData();
    const cellPosition = data.get('cellPosition');

    if (!cellPosition) {
        return null;
    }

    // Tách cellPosition thành tableKey, row, và column
    const [tableKey, row, column] = cellPosition.split('-');

    return {
        tableKey,
        row: Number(row),
        column: Number(column),
    };
};

export default getCellPosition;






// const changeCellsStyle = ({ cellsPosition }) => {
//     // cellsPosition là thông tin được lấy ra từ hàm getCellsPositionOnSelection
//     // tìm block có key = cellsPosition.tableKey
//     // lấy ra data.tableShape
//     // dựa vào cellsPosition.cellsPosition để thay đổi thông tin indivualStyle trong đúng vị trí của data.tableShape đã lấy ra
//     // thay trở lại  data.tableShape vào block
// }

