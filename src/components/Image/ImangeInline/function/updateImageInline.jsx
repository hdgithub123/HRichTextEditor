import React, { useState, useEffect } from 'react';
import { Editor, EditorState, CompositeDecorator, convertToRaw } from 'draft-js';


// const updateImageInline = ({entityKey, imageInfo, editorState, setEditorState}) => {
    const updateImageInline = ({entityKey, imageInfo, editorState, setEditorState}) => {
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