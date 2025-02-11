import findImageEntities from '../function/findImageEntities';
import ImageInlineComponent from '../Component/ImageInlineComponent';
import { Editor, EditorState, CompositeDecorator, Modifier } from 'draft-js';

const imageInlineDecorator = ({editorState,onImagePropertiesChange}) =>{

 const newDecorator = {
    strategy: findImageEntities,
    component: (props) => (
      <ImageInlineComponent {...props} editorState={editorState} onImagePropertiesChange={onImagePropertiesChange} />
    ),
  }

return newDecorator;
}  ;

export default imageInlineDecorator;