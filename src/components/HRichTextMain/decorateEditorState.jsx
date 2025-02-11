import { Editor, EditorState, CompositeDecorator, Modifier } from 'draft-js';
import imageInlineDecorator from '../Image/ImangeInline/decorator/createDecorator';


const createDecorator = ({ editorState, functionList }) => {
  return new CompositeDecorator([
    imageInlineDecorator({ editorState, onImagePropertiesChange: functionList.onImagePropertiesChange }),
  ]);
};




const decorateEditorState = ({ editorState, functionList }) => {
  const decorator = createDecorator({ editorState, functionList });
  const newEditorState = EditorState.set(editorState, { decorator });
  return newEditorState;
}

export default decorateEditorState;