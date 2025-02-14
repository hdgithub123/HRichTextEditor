import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator, convertToRaw, convertFromRaw } from 'draft-js';

const addLink = ({editorState,setEditorState,url}) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const entityKey = contentState.createEntity('LINK', 'MUTABLE', { url }).getLastCreatedEntityKey();
    const newContentState = Modifier.applyEntity(
      contentState,
      selectionState,
      entityKey
    );
    setEditorState(EditorState.push(editorState, newContentState, 'apply-entity'));
  };


  export default addLink