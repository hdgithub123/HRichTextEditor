import React, { useState, useEffect } from 'react';
import { Editor, EditorState, CompositeDecorator, convertToRaw } from 'draft-js';
import getCurrentBlock from '../../../utilities/getCurrentBlockType'

const updateImageInline = ({ entityKey, imageInfo, editorState, setEditorState }) => {
    const currentBlockType = getCurrentBlock({ editorState })

    if (!currentBlockType || currentBlockType === "IMAGE_INLINE") {
        return
    }


    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.mergeEntityData(entityKey, {
        ...imageInfo,
    });

    const newEditorState = EditorState.push(
        editorState,
        contentStateWithEntity,
        'apply-entity'
    );

    // Buộc editor render lại
    const selectionState = newEditorState.getSelection();
    const forcedEditorState = EditorState.forceSelection(newEditorState, selectionState);
    setEditorState(forcedEditorState);
};


export default updateImageInline;