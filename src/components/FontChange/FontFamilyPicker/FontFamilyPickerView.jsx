import { RichUtils } from 'draft-js';
import FontFamilyPicker from './FontFamilyPicker';
import { _FONTFAMILY } from '../../_constant/_constant'

const FONTS = _FONTFAMILY
const FontFamilyPickerView = ({ editorState, setEditorState }) => {

    const getCurrentFont = () => {

        try {
            // Đoạn mã có thể gây ra lỗi
            const currentStyle = editorState.getCurrentInlineStyle();
            const fontStyles = Array.from(currentStyle).filter(style => style.startsWith('fontFamily.'));
            const lastFontStyle = fontStyles.length > 0 ? fontStyles[fontStyles.length - 1] : null;
            return lastFontStyle ? lastFontStyle.split('.')[1] : 'Arial'; // Default to Arial if no font is selected  
        
        
        
        } catch (error) {
            // Xử lý lỗi
            return 'Arial'
          }


        // if (!editorState || !editorState.getCurrentInlineStyle) {
        //     return 'Arial'; // Default to Arial if editorState is not defined
        // }
        // const currentStyle = editorState.getCurrentInlineStyle();
        // if (!currentStyle) {
        //     return 'Arial'; // Default to Arial if no inline style is selected
        // }
        // const currentStyle = editorState.getCurrentInlineStyle();
        
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