import { RichUtils } from 'draft-js';

import FontBold from './FontBold/FontBold';
import FontItalic from './FontItalic/FontItalic';
import FontUnderline from './FontUnderline/FontUnderline';
import FontStrikethrough from './FontStrikethrough/FontStrikethrough';
import FontSubscript from './FontSubscript/FontSubscript';
import FontSuperscript from './FontSuperscript/FontSuperscript';
import FontUppercase from './FontUppercase/FontUppercase';
import FontLowercase from './FontLowercase/FontLowercase';



const FontType = ({ editorState, setEditorState }) => {

    const getCurrentTypeOfStyle = (style) => {
      try {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
      } catch (error) {
        return false;
      }
        
      };
    
      const handleClickTypeOfStyle = (style) => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
        setEditorState(newEditorState);
      };




    return (
        <div style={{ display: 'flex', flexDirection:'row' , gap:'5px'}}>
            <FontBold currentStyle={getCurrentTypeOfStyle('BOLD')} onClick={() => handleClickTypeOfStyle('BOLD')} />
            <FontItalic currentStyle={getCurrentTypeOfStyle('ITALIC')} onClick={() => handleClickTypeOfStyle('ITALIC')} />
            <FontUnderline currentStyle={getCurrentTypeOfStyle('UNDERLINE')} onClick={() => handleClickTypeOfStyle('UNDERLINE')} />
            <FontStrikethrough currentStyle={getCurrentTypeOfStyle('STRIKETHROUGH')} onClick={() => handleClickTypeOfStyle('STRIKETHROUGH')} />
            <FontSubscript currentStyle={getCurrentTypeOfStyle('SUBSCRIPT')} onClick={() => handleClickTypeOfStyle('SUBSCRIPT')} />
            <FontSuperscript currentStyle={getCurrentTypeOfStyle('SUPERSCRIPT')} onClick={() => handleClickTypeOfStyle('SUPERSCRIPT')} />
            <FontUppercase currentStyle={getCurrentTypeOfStyle('UPPERCASE')} onClick={() => handleClickTypeOfStyle('UPPERCASE')} />
            <FontLowercase currentStyle={getCurrentTypeOfStyle('LOWERCASE')} onClick={() => handleClickTypeOfStyle('LOWERCASE')} />
        </div>
    );
}


export default FontType;