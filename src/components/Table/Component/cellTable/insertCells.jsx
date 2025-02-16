import { EditorState, SelectionState, ContentBlock, genKey } from 'draft-js';
import { Map } from 'immutable';

const insertCells = (editorState, cellsData) => {
    if (!Array.isArray(cellsData) || cellsData.length === 0) {
        console.error('Invalid cellsData:', cellsData);
        return editorState;
    }

    let contentState = editorState.getCurrentContent();
    let blockMap = contentState.getBlockMap();

    // Sử dụng withMutations để tối ưu hiệu suất khi thay đổi nhiều phần tử
    const updatedBlockMap = blockMap.withMutations(map => {
        const newBlocks = cellsData.map(({ tableKey, cellPosition, text }) => {
            if (!tableKey || !cellPosition || text === undefined) {
                console.error('Invalid cellData');
                return null;
            }
            return new ContentBlock({
                key: genKey(),
                type: 'cellTable',
                text,
                data: Map({ tableKey, cellPosition }),
            });
        }).filter(Boolean);

        // Thêm tất cả các cell vào blockMap một lần
        newBlocks.forEach(block => map.set(block.getKey(), block));
    });

    // Lấy key của block cuối cùng để cập nhật selection
    const lastBlockKey = updatedBlockMap.keySeq().last();
    contentState = contentState.merge({
        blockMap: updatedBlockMap,
        selectionAfter: lastBlockKey ? SelectionState.createEmpty(lastBlockKey) : contentState.getSelectionAfter(),
    });

    // Chỉ gọi EditorState.push một lần duy nhất để tránh nhiều lần render
    return EditorState.push(editorState, contentState, 'insert-fragment');
};

export default insertCells;
