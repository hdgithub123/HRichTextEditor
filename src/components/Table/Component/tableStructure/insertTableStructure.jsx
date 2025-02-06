import { EditorState, SelectionState, ContentBlock, genKey } from 'draft-js';
import { Map } from 'immutable';

const insertTableStructure = async (editorState, tableKey, dataTableStructure) => {
    let selection = editorState.getSelection();
    if (!selection.isCollapsed()) return null;

    const newTableBlock = new ContentBlock({
        key: tableKey,
        type: 'tableStructure',
        text: ' ',
        data: Map(dataTableStructure)
    });

    const beforeTextBlock = new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        text: ' ',
    });

    const afterTextBlock = new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        text: ' ',
    });

    let contentState = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const startBlock = contentState.getBlockForKey(startKey);

    if (startBlock.getType() === 'cellTable') return null;

    const blockMap = contentState.getBlockMap();
    const blocksBefore = blockMap.toSeq().takeUntil(v => v === contentState.getBlockForKey(selection.getStartKey()));
    const blocksAfter = blockMap.toSeq().skipUntil(v => v === contentState.getBlockForKey(selection.getStartKey())).rest();
    const newBlockMap = blocksBefore
        .concat([
            [beforeTextBlock.getKey(), beforeTextBlock],
            [newTableBlock.getKey(), newTableBlock],
            [afterTextBlock.getKey(), afterTextBlock]
        ], blocksAfter)
        .toOrderedMap();

    contentState = contentState.merge({
        blockMap: newBlockMap,
        selectionAfter: selection
    });

    let newEditorState = EditorState.push(editorState, contentState, 'insert-fragment');
    selection = SelectionState.createEmpty(afterTextBlock.getKey());
    newEditorState = EditorState.forceSelection(newEditorState, selection);

    return newEditorState;
};



export default insertTableStructure;    