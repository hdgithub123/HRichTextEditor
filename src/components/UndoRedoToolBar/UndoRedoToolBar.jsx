import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils
} from 'draft-js';
import undoIcon from './undo.svg';
import redoIcon from './redo.svg'
import style from './UndoRedoToolBar.module.scss'


const UndoRedoToolBar = ({ editorState, setEditorState }) => {

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
        <button onClick={handleUndo} disabled={!editorState.getUndoStack().size}>
          <img src={undoIcon} alt="Undo" title="Undo" className={`${style.img} ${style.active}`} />
        </button>
        <button onClick={handleRedo} disabled={!editorState.getRedoStack().size}>
          <img src={redoIcon} alt="Redo" title="Redo" className={`${style.img} ${style.active}`} />
        </button>
    </div>
  );
};

export default UndoRedoToolBar;
