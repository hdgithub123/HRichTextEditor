import emojiList from '../emojiList'
import insertEmoji from '../insertEmoji'

const EmojiToolBar = ({ editorState, setEditorState }) => {
    const handleonClick = (emoji) => {
        insertEmoji({emoji, editorState, setEditorState })
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <div style={{ marginBottom: "10px"  }}>
                {emojiList.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => handleonClick(emoji)}
                        style={{
                            fontSize: "20px",
                            margin: "5px",
                            padding: "8px",
                            cursor: "pointer",
                        }}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmojiToolBar;
