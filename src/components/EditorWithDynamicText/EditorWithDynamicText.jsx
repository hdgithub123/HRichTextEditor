import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  ContentState,
  Modifier,
  CompositeDecorator,
  RichUtils,
  convertToRaw,
  SelectionState,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

// Strategy to find {textbox value} placeholders
const findPlaceholderStrategy = (contentBlock, callback, contentState) => {
  const text = contentBlock.getText();
  const placeholderRegex = /\{textbox value\}/g;
  let matchArr;
  while ((matchArr = placeholderRegex.exec(text)) !== null) {
    const start = matchArr.index;
    const end = start + matchArr[0].length;
    callback(start, end);
  }
};

// Component to highlight placeholders
const Placeholder = ({ children }) => {
  return <span>{children}</span>;
};

// Custom style map for inline styles
const customStyleMap = {
  BOLD: {
    fontWeight: 'bold',
  },
  ITALIC: {
    fontStyle: 'italic',
  },
  UNDERLINE: {
    textDecoration: 'underline',
  },
};

// Main Component
const EditorWithDynamicText = () => {
  const [textBoxValue, setTextBoxValue] = useState('');
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(
      new CompositeDecorator([
        {
          strategy: findPlaceholderStrategy,
          component: Placeholder,
        },
      ])
    )
  );


  const handleOnClick = () => {
    const newValue = textBoxValue;
  
    // Replace {textbox value} in the editor
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();
  
    let updatedContent = contentState;
    blocks.forEach((block) => {
      const text = block.getText();
      const placeholderRegex = /\{textbox value\}/g;
      let match;
      while ((match = placeholderRegex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        const selection = SelectionState.createEmpty(block.getKey()).merge({
          anchorOffset: start,
          focusOffset: end,
        });
  
        // Lấy các kiểu định dạng hiện có của văn bản
        const currentInlineStyle = block.getInlineStyleAt(start);
  
        // Thay thế văn bản và giữ nguyên các kiểu định dạng
        updatedContent = Modifier.replaceText(
          updatedContent,
          selection,
          newValue,
          currentInlineStyle
        );
      }
    });
  
    setEditorState(EditorState.push(editorState, updatedContent, 'apply-entity'));
  };
  
  const handleTextBoxChange = (e) => {
    const newValue = e.target.value;
    setTextBoxValue(newValue);
  };

  const applyInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Function to render editor content as HTML
  const getHTML = () => {
    const contentState = editorState.getCurrentContent();
    const blocks = convertToRaw(contentState).blocks;
    return blocks.map((block) => block.text).join('<br/>');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ marginBottom: '20px' }}>
        <label>
        {'{textbox value}'}:
          <input
            type="text"
            value={textBoxValue}
            onChange={handleTextBoxChange}
            style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
          />
          <button onClick={handleOnClick} style={{ marginLeft: '10px' }}>
            Change Text
          </button>
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => applyInlineStyle('BOLD')} style={{ marginRight: '10px' }}>
          Bold
        </button>
        <button onClick={() => applyInlineStyle('ITALIC')} style={{ marginRight: '10px' }}>
          Italic
        </button>
        <button onClick={() => applyInlineStyle('UNDERLINE')} style={{ marginRight: '10px' }}>
          Underline
        </button>
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          minHeight: '200px',
          padding: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Type something here, including {textbox value}!"
          customStyleMap={customStyleMap} // Apply custom styles
        />
      </div>
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>

      <div style={{ marginTop: '20px' }}>
        <h3>Rendered HTML:</h3>
        <div
          style={{
            whiteSpace: 'pre-wrap',
            background: '#f4f4f4',
            padding: '10px',
            border: '1px solid #ddd',
          }}
        >
          {getHTML()}
        </div>
      </div>
    </div>
  );
};

export default EditorWithDynamicText;