import { RichUtils } from 'draft-js';
import FontFamilyPicker from './FontFamilyPicker';
import { _FONTFAMILY } from '../../_constant/_constant'

const FONTS = _FONTFAMILY
const FontFamilyPickerView = ({ editorState, setEditorState }) => {

    const getCurrentFont = () => {
        const currentStyle = editorState.getCurrentInlineStyle();
        const fontStyles = Array.from(currentStyle).filter(style => style.startsWith('fontFamily.'));
        const lastFontStyle = fontStyles.length > 0 ? fontStyles[fontStyles.length - 1] : null;
        return lastFontStyle ? lastFontStyle.split('.')[1] : 'Arial'; // Default to Arial if no font is selected
      };
  
  
      const handleSelectFont = (font) => {
          const newEditorState = RichUtils.toggleInlineStyle(editorState, `fontFamily.${font}`);
          setEditorState(newEditorState);
      };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <FontFamilyPicker Fonts={FONTS} currentFont={getCurrentFont()} onSelectFont={handleSelectFont} />
        </div>
    )
}

export default FontFamilyPickerView;