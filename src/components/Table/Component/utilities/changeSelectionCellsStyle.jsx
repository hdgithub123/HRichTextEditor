import getCellsPositionOnSelection from './getCellsPositionOnSelection'
import changeCellsStyle from './changeCellsStyle'

const changeSelectionCellsStyle = ({editorState,onChange, newStyle={}}) => {
    const cellsPosition = getCellsPositionOnSelection({ editorState })
    const newEditorState = changeCellsStyle({ editorState, cellsPosition, newStyle })
    if (newEditorState !== editorState) {
        onChange(newEditorState);
    } else {

    }
   
}

export default changeSelectionCellsStyle