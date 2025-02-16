import { RichUtils } from 'draft-js';
import FontColorPicker from './FontColorPicker';
import { _COLORS } from '../../_constant/_constant'

const COLORS = _COLORS
const FontColorPickerView = ({ editorState, setEditorState }) => {
    const getCurrentColor = () => {
        try {
            const currentStyle = editorState.getCurrentInlineStyle();
            const colorStyles = Array.from(currentStyle).filter(style => style.startsWith('color.'));
            const lastColorStyle = colorStyles.length > 0 ? colorStyles[colorStyles.length - 1] : null;
            return lastColorStyle ? lastColorStyle.split('.')[1] : 'black'; // Default to black if no color is selected
        } catch (error) {
            return 'black'
        }
    };

    const handleSelectColor = (color) => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, `color.${color}`);
        setEditorState(newEditorState);
    };


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <FontColorPicker colors={COLORS} currentColor={getCurrentColor()} onSelectColor={handleSelectColor} />
        </div>
    )
}

export default FontColorPickerView;