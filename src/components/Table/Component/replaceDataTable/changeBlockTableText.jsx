import { EditorState, ContentState, genKey, ContentBlock } from 'draft-js';
import { numberOfUniqueRows, findTableIdBlocks } from './ultils';
import { OrderedMap,List } from 'immutable';


const changeBlockTableText = ({ editorState, tableData, tableKey }) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    const blockMapJS = blockMap.toJS();
    const { data, tableId } = tableData;
    const columnBlocks = findTableIdBlocks({ blockMapJS, tableId });
    const uniqueRows = numberOfUniqueRows({ columnBlocks });
    let changeBlockMap = changeTextBlocksMap({ blockMap, numberOfUniqueRows: uniqueRows, data, newTableBlock: columnBlocks, tableKey, tableId });
    const newContentState = ContentState.createFromBlockArray(changeBlockMap.toArray());
    const newEditorState = EditorState.createWithContent(newContentState);


    return newEditorState;
}





const changeTextBlocksMap = ({ blockMap, numberOfUniqueRows, data, newTableBlock, tableKey, tableId }) => {
    let newBlockMap = OrderedMap();
    blockMap.forEach((block) => {
        // Kiểm tra xem block có chứa data.tableKey = tableKey không
        if (block.getData().get('tableKey') === tableKey) {
            // Kiểm tra xem data.cellPosition: tableKey-row-col có row nằm trong numberOfUniqueRows không
            const cellPosition = block.getData().get('cellPosition');
            const [, row] = cellPosition.split('-');
            if (!numberOfUniqueRows.has(parseInt(row, 10))) {
                const newBlock = changeOneTableBlockNotInnumberOfUniqueRows({ block, numberOfUniqueRows, data });
                newBlockMap = newBlockMap.set(block.getKey(), newBlock);
            } else {
                // Kiểm tra xem block.key có bằng 1 trong các newTableBlock.key không nếu không thì thêm numberRow lần block vào blocksMap
                const blockKey = block.getKey();
                const isBlockInNewTableBlock = newTableBlock.some(newBlock => newBlock.key === blockKey);
                if (!isBlockInNewTableBlock) {
                    const newBlocks = changeOneTableBlockInnumberOfUniqueRowsButNotInTable({ block, numberOfUniqueRows, data });
                    newBlocks.forEach(newBlock => {
                        newBlockMap = newBlockMap.set(newBlock.getKey(), newBlock);
                    });
                } else {
                    const newBlocks = changeOneTableBlockInnumberOfUniqueRowsInTable({ block, numberOfUniqueRows, data, tableId });
                    newBlocks.forEach(newBlock => {
                        newBlockMap = newBlockMap.set(newBlock.getKey(), newBlock);
                    });
                }
            }
        } else {
            newBlockMap = newBlockMap.set(block.getKey(), block);
        }
    });
    return newBlockMap;
};




const changeOneTableBlockNotInnumberOfUniqueRows = ({ block, numberOfUniqueRows, data }) => {
    const cellPosition = block.getData().get('cellPosition');
    const [, row] = cellPosition.split('-');
    const rowNumber = parseInt(row, 10);
    const numberRowPlus = data.length;
    // Kiểm tra xem row lớn hơn bao nhiêu số của numberOfUniqueRows
    const largerRows = Array.from(numberOfUniqueRows).filter(uniqueRow => rowNumber > uniqueRow);
    let numberRowChange = 0;
    if (rowNumber === 0) {
        numberRowChange = rowNumber;
    } else {
        numberRowChange = (largerRows.length) * (numberRowPlus - 1) + rowNumber;
    }

    const newBlock = new ContentBlock({
        key: genKey(),
        type: block.getType(),
        text: block.getText(),
        characterList: block.getCharacterList(),
        data: block.getData().set('cellPosition', `${block.getData().get('tableKey')}-${numberRowChange}-${block.getData().get('cellPosition').split('-')[2]}`),
        inlineStyleRanges: block.get('inlineStyleRanges') || [],
        entityRanges: block.get('entityRanges') || [],
    });
    return newBlock;
}


const changeOneTableBlockInnumberOfUniqueRowsButNotInTable = ({ block, numberOfUniqueRows, data }) => {
    const cellPosition = block.getData().get('cellPosition');
    const [, row] = cellPosition.split('-');
    const rowNumber = parseInt(row, 10);
    const numberRowPlus = data.length;
    const largerRows = Array.from(numberOfUniqueRows).filter(uniqueRow => rowNumber > uniqueRow);
    let firstnumberRow = 0;

    if (rowNumber === 0) {
        firstnumberRow = rowNumber;
    } else {
        firstnumberRow = (largerRows.length) * (numberRowPlus - 1) + rowNumber;
    }

    const lastnumberRow = firstnumberRow + data.length;
    const newBlocks = [];
    for (let i = firstnumberRow; i < lastnumberRow; i++) {
        // Tạo mới các block từ block đưa vào có key khác = genKey() và thay đổi row của cellPosition: tableKey-row-col và đưa vào newBlocks
        const newBlock = new ContentBlock({
            key: genKey(),
            type: block.getType(),
            text: block.getText(),
            characterList: block.getCharacterList(),
            data: block.getData().set('cellPosition', `${block.getData().get('tableKey')}-${i}-${block.getData().get('cellPosition').split('-')[2]}`),
            inlineStyleRanges: block.get('inlineStyleRanges') || [],
            entityRanges: block.get('entityRanges') || [],
        });
        newBlocks.push(newBlock);
    }
    return newBlocks;
}



const changeOneTableBlockInnumberOfUniqueRowsInTable = ({ block, numberOfUniqueRows, data, tableId }) => {
    const cellPosition = block.getData().get('cellPosition');
    const [, row] = cellPosition.split('-');
    const rowNumber = parseInt(row, 10);
    const numberRowPlus = data.length;
    const largerRows = Array.from(numberOfUniqueRows).filter(uniqueRow => rowNumber > uniqueRow);
    let firstnumberRow = 0;

    if (rowNumber === 0) {
        firstnumberRow = rowNumber;
    } else {
        firstnumberRow = (largerRows.length) * (numberRowPlus - 1) + rowNumber;
    }
    const lastnumberRow = firstnumberRow + data.length;
    const newBlocks = [];
    const regex = new RegExp(`{{${tableId}\.(.*?)}}`, 'g');
    for (let i = firstnumberRow; i < lastnumberRow; i++) {
        // Tạo mới các block từ block đưa vào có key khác = genKey()
        // Thay đổi row của cellPosition: tableKey-row-col
        // Thay đổi phần text của block chứa các ký tự {{tableId.variant}} trong đó variant là trường của data thì thay thế bằng dữ liệu của data.variant
        let blockText = block.getText();
        let newText = '';
        let lastIndex = 0;
        let firstIndex = -1;
        let newCharacterList = List();
        let match;
        let dataTextChange ="";
        // Sử dụng regex để tìm và thay thế các placeholder
        while ((match = regex.exec(blockText)) !== null) {
            const field = match[1];
            const replacement = data[i - firstnumberRow][field] !== undefined ? data[i - firstnumberRow][field] : match[0];
            newText += blockText.substring(lastIndex, match.index) + replacement;
            lastIndex = match.index + match[0].length;
            if (firstIndex === -1) {
                firstIndex = match.index;
            }

            dataTextChange = data[i - firstnumberRow][field]
        
            newText += blockText.substring(lastIndex);
            const firstCharacterList = block.getCharacterList().get(firstIndex);
            for (let j = 0; j < blockText.toString().length; j++) {
                if (j < firstIndex) {   
                    newCharacterList = newCharacterList.push(block.getCharacterList().get(j));
                } else if (j >= firstIndex && j < lastIndex) {
                    if (j === firstIndex) {
                        for (let k = 0; k < dataTextChange.toString().length; k++) {
                            newCharacterList = newCharacterList.push(firstCharacterList);
                        }
                    }
    
                } else {
                    newCharacterList = newCharacterList.push(block.getCharacterList().get(j));
                }
            }
        
        
        }
        // Cập nhật characterList mới bằng cách đi qua lần lượt từng ký tự của newText và lấy characterList của ký tự đó
        // gán vào newCharacterList ký tự thứ 1 đến firstIndex, ký tự firstIndex đến lastIndex gán bằng firstCharacterList, ký tự lastIndex +1 của newText đến hết lần lượt gán bằng ký tự từ lastIndex +1 của oldtext -- lastIndex+ n của oldText cho đến hết của newText

        const newBlock = new ContentBlock({
            key: genKey(),
            type: block.getType(),
            text: newText.toString(),
            characterList: newCharacterList,
            data: block.getData().set('cellPosition', `${block.getData().get('tableKey')}-${i}-${block.getData().get('cellPosition').split('-')[2]}`),
            inlineStyleRanges: block.get('inlineStyleRanges') || [],
            entityRanges: block.get('entityRanges') || [],
        });
        newBlocks.push(newBlock);
    }
    return newBlocks;
}


export default changeBlockTableText;

