import { ColorPicker, applyInlineStyle } from '../../utilities';
import styles from './FontBackGroundColorToolbar.module.scss';

const FontBackGroundColorToolbar = ({ editorState, setEditorState }) => {
    const getCurrentBackGroundColor = () => {
        try {
            const currentStyle = editorState.getCurrentInlineStyle();
            const bgColorStyles = Array.from(currentStyle).filter(style => style.startsWith('backgroundColor.'));
            const lastBgColorStyle = bgColorStyles.length > 0 ? bgColorStyles[bgColorStyles.length - 1] : null;
            return lastBgColorStyle ? lastBgColorStyle.split('.')[1] : 'white'; // Default to white if no background color is selected
        } catch (error) {
            return 'white';
        }
    };

    const handleSelectBackGroundColor = (color) => {
        if(color !== getCurrentBackGroundColor()){
            const inlineStyle = `backgroundColor.${color}`
            const newEditorState = applyInlineStyle({editorState, inlineStyle,isRemove:false});
            setEditorState(newEditorState);
        } else {
            const inlineStyle = `backgroundColor.${color}`
            const newEditorState = applyInlineStyle({editorState, inlineStyle,isRemove:true});
            setEditorState(newEditorState);
        }
    }


    return (
        <div title='Font background color' className={styles.fontColorPicker}>
            <ColorPicker
                onChange={handleSelectBackGroundColor}
                defaultColor={getCurrentBackGroundColor()}
            >
            </ColorPicker>
        </div>
    )
}

export default FontBackGroundColorToolbar;
//     const contentState = editorState.getCurrentContent(); // Get current content
//     const selection = editorState.getSelection(); // Get selection range
  
//     // Filter all styles that match the prefix of the inline style (e.g., `backgroundColor.`)
//     const stylesToRemove = currentStyle.filter((style) =>
//       style.startsWith(inlineStyle.split(".")[0]) // Match the prefix, e.g., `backgroundColor`
//     );
  
//     let newContentState = contentState;
  
//     // Remove all matching styles (or only the specific inlineStyle if isRemove = true)
//     stylesToRemove.forEach((style) => {
//       if (isRemove && style !== inlineStyle) return; // Remove only the specific inlineStyle if isRemove = true
//       newContentState = Modifier.removeInlineStyle(newContentState, selection, style);
//     });
  
//     // If isRemove is true, return the editorState after removing styles
//     if (isRemove) {
//       return EditorState.push(editorState, newContentState, "change-inline-style");
//     }
  
//     // Otherwise, apply the inlineStyle
//     const editorStateWithoutStyles = EditorState.push(
//       editorState,
//       newContentState,
//       "change-inline-style"
//     );
  
//     const newEditorStateWithStyle = RichUtils.toggleInlineStyle(
//       editorStateWithoutStyles,
//       inlineStyle
//     );
  
//     return newEditorStateWithStyle;
//   };