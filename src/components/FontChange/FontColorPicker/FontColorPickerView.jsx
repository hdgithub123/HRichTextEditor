import { ColorPicker, applyInlineStyle } from '../../utilities';
import styles from './FontColorPickerView.module.scss';

const FontColorPickerView = ({ editorState, setEditorState }) => {
    const getCurrentColor = () => {
        try {
            const currentStyle = editorState.getCurrentInlineStyle();
            const colorStyles = Array.from(currentStyle).filter(style => style.startsWith('color.'));
            const lastColorStyle = colorStyles.length > 0 ? colorStyles[colorStyles.length - 1] : null;
            return lastColorStyle ? lastColorStyle.split('.')[1] : ''; // Default to black if no color is selected
        } catch (error) {
            return 'black'
        }
    };

    const handleSelectColor = (color) => {
        if(color !== getCurrentColor()){
            const inlineStyle = `color.${color}`
            const newEditorState = applyInlineStyle({editorState, inlineStyle,isRemove:false});
            setEditorState(newEditorState);
        } else {
            const inlineStyle = `color.${color}`
            const newEditorState = applyInlineStyle({editorState, inlineStyle,isRemove:true});
            setEditorState(newEditorState);
        }

    };


    return (
        <div  title='Font color' className={styles.fontColorPicker}>
            <ColorPicker
                onChange={handleSelectColor}
                curentColor={getCurrentColor()}
                isUnlimitedColor= {false}
            >
            </ColorPicker>
        </div>
        
    )
}

export default FontColorPickerView;