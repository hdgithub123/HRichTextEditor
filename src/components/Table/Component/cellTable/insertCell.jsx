import {  EditorState, SelectionState, ContentBlock, genKey } from 'draft-js';
import { Map } from 'immutable';


const insertCell = (editorState, cellData) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    const { tableKey, cellPosition, text } = cellData;
    if (!tableKey || !cellPosition || text === undefined) {
        console.error('Invalid cellData:', cellData);
        return editorState;
    }
    // Tạo một khối mới
    const newBlock = new ContentBlock({
        key: genKey(),
        type: 'cellTable',
        text: text,
        data: Map({ tableKey, cellPosition}),
    });

    // Thêm khối mới vào cuối blockMap
    const newBlockMap = blockMap.set(newBlock.getKey(), newBlock);

    // Tạo contentState mới với blockMap mới
    const newContentState = contentState.merge({
        blockMap: newBlockMap,
        selectionAfter: SelectionState.createEmpty(newBlock.getKey())
    });

    // Tạo editorState mới với contentState mới
    const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
    return newEditorState;
};

export default insertCell;