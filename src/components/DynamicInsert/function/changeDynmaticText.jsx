import { EditorState, Modifier, SelectionState } from 'draft-js';

const changeDynamicText = ({ editorState, dataDynamicText }) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    let newContentState = contentState;

    blockMap.forEach((block) => {
        const blockText = block.getText();
        const blockKey = block.getKey();
        const characterList = block.getCharacterList(); // Lấy style từng ký tự

        const regex = /\{\{(.*?)\}\}/g;
        let matches = [];
        let match;

        while ((match = regex.exec(blockText)) !== null) {
            matches.push({
                key: match[1],
                start: match.index,
                end: match.index + match[0].length,
            });
        }

        for (let i = matches.length - 1; i >= 0; i--) {
            const { key, start, end } = matches[i];
            if (dataDynamicText[key]) {
                const replacementText = dataDynamicText[key];

                // **Lấy style của ký tự đầu tiên `{`**
                const firstCharStyle = characterList.get(start)?.getStyle() || new Set();

                // Tạo selection để thay thế
                const selectionState = SelectionState.createEmpty(blockKey).merge({
                    anchorOffset: start,
                    focusOffset: end,
                });

                // **Thay thế nhưng áp dụng lại style của `{`**
                newContentState = Modifier.replaceText(
                    newContentState,
                    selectionState,
                    replacementText,
                    firstCharStyle // Áp dụng style
                );
            }
        }
    });

    return EditorState.push(editorState, newContentState, 'insert-characters');
};


export default changeDynamicText;
