import React, { useState, useEffect } from 'react';
import addLink from "../function/addLink";
import removeLink from '../function/removeLink'
import { EditorState, RichUtils } from 'draft-js';

const LinkifyToolBar = ({ editorState, setEditorState }) => {
    const [url, setUrl] = useState('');
    const [placeHolder, setplaceHolder] = useState('Enter link');

    // useEffect(() => {
    //     const selection = editorState.getSelection();
    //     if (!selection.isCollapsed()) {
    //         const contentState = editorState.getCurrentContent();
    //         const startKey = selection.getStartKey();
    //         const startOffset = selection.getStartOffset();
    //         const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    //         const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    //         if (linkKey) {
    //             const linkInstance = contentState.getEntity(linkKey);
    //             const { url } = linkInstance.getData();
    //             setplaceHolder(url);
    //         } else {
    //             setplaceHolder('');
    //         }
    //     }
    // }, [editorState]);

    const handleOnClick = () => {
        addLink({ url, editorState, setEditorState });
        setUrl('')
    };

    const handleRemoveLink = () => {
        removeLink({ editorState, setEditorState });
    }


    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder={'Enter link'}
                style={{ marginRight: '10px' }}
            />
            <button onClick={handleOnClick}>Add Link</button>
            <button onClick={handleRemoveLink}>Remove Link</button>
        </div>
    );
};

export default LinkifyToolBar;