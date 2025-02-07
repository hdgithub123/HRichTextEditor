import { RichUtils } from 'draft-js';
import FontSizePicker from './FontSizePicker';
import { _FONTSIZES } from '../../_constant/_constant'

const FONT_SIZES = _FONTSIZES
const FontSizePickerView = ({ editorState, setEditorState }) => {
    const getCurrentSize = () => {
        const currentStyle = editorState.getCurrentInlineStyle();
        const sizeStyles = Array.from(currentStyle).filter(style => style.startsWith('fontSize.'));
        const lastSizeStyle = sizeStyles.length > 0 ? sizeStyles[sizeStyles.length - 1] : null;
        return lastSizeStyle ? lastSizeStyle.split('.')[1] : '12'; // Default to 12pt if no size is selected
    };

    const handleSelectSize = (size) => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, `fontSize.${size}`);
        setEditorState(newEditorState);
    };


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <FontSizePicker sizes={FONT_SIZES} currentSize={getCurrentSize()} onSelectSize={handleSelectSize} />
        </div>
    )
}

export default FontSizePickerView;