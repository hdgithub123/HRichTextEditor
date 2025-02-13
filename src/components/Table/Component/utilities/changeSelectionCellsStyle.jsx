import getCellsPositionOnSelection from './getCellsPositionOnSelection'
import changeCellsStyle from './changeCellsStyle'

const changeSelectionCellsStyle = ({editorState,setEditorState, newStyle={}}) => {
    const cellsPosition = getCellsPositionOnSelection({ editorState })
    const newEditorState = changeCellsStyle({ editorState, cellsPosition, newStyle})
    setEditorState(newEditorState)
}

export default changeSelectionCellsStyle