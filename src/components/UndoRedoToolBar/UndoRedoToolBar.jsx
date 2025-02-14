import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils
} from 'draft-js';
import style from './UndoRedoToolBar.module.scss'


const UndoRedoToolBar = ({editorState, setEditorState}) => {

  // Hàm Undo
  const handleUndo = () => {
    setEditorState(EditorState.undo(editorState));
  };

  // Hàm Redo
  const handleRedo = () => {
    setEditorState(EditorState.redo(editorState));
  };

  return (
    <div className={style.container}>
      <div>
        <button onClick={handleUndo} disabled={!editorState.getUndoStack().size}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={!editorState.getRedoStack().size}>
          Redo
        </button>
      </div>
    </div>
  );
};

export default UndoRedoToolBar;
