const dynamicText = [
    'idText1',
    'idText2',
    'idText3',
]

import insertText from "../function/insertText"

const DynamicText = ({ editorState, setEditorState }) => {
    const handleInsertText = (text) => {
        const wrappedText = `{{${text}}}`;
        const newEditorState = insertText({editorState,text: wrappedText});
        setEditorState(newEditorState);
    };

    return (
        <div>
            {dynamicText.map((text, index) => (
                <button key={index} onClick={() => handleInsertText(text)}>
                    {`{{${text}}}`}
                </button>
            ))}
        </div>
    );
};

export default DynamicText;