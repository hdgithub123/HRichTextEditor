import React, { useState, useEffect } from 'react';
import { Editor, EditorState, CompositeDecorator ,convertToRaw} from 'draft-js';



const updateImageInline = ( entityKey,infoImage, editorState, setEditorState) => {
    const contentState = editorState.getCurrentContent();
    const { width, height, unit } = infoImage;
    const contentStateWithEntity = contentState.mergeEntityData(entityKey, {
        width,
        height, 
        unit,
    });
  
    const newEditorState = EditorState.push(
        editorState,
        contentStateWithEntity,
        'apply-entity'
    );
  
    // Buộc editor render lại
    const selectionState = newEditorState.getSelection();
    const forcedEditorState = EditorState.forceSelection(newEditorState, selectionState);

    return forcedEditorState;
  };


  export default updateImageInline;