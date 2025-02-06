import {EditorState, SelectionState, ContentBlock, genKey } from 'draft-js';
import { Map } from 'immutable';


const insertCells = (editorState, cellsData) => {
    let contentState = editorState.getCurrentContent();
    let blockMap = contentState.getBlockMap();
    if (!Array.isArray(cellsData)) {
        console.error('Invalid cellsData:', cellsData);
        return editorState;
    }
    cellsData.forEach(cellData => {
        const { tableKey, cellPosition, text } = cellData;
        if (!tableKey || !cellPosition || text === undefined) {
            console.error('Invalid cellData:', cellData);
            return;
        }

        // Tạo một khối mới
        const newBlock = new ContentBlock({
            key: genKey(),
            type: 'cellTable',
            text: text,
            data: Map({ tableKey, cellPosition }),
        });

        // Thêm khối mới vào cuối blockMap
        blockMap = blockMap.set(newBlock.getKey(), newBlock);
    });

    // Tạo contentState mới với blockMap mới
    contentState = contentState.merge({
        blockMap: blockMap,
        selectionAfter: SelectionState.createEmpty(blockMap.last().getKey())
    });

    // Tạo editorState mới với contentState mới
    const newEditorState = EditorState.push(editorState, contentState, 'insert-fragment');
    return newEditorState;
};

export default insertCells; 