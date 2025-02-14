import findLinkEntities from '../function/findLinkEntities';
import LinkComponent from '../Component/LinkComponent';
import { Editor, EditorState, CompositeDecorator, Modifier } from 'draft-js';

const linkifyCreateDecorator = () =>{

 const newDecorator = {
    strategy: findLinkEntities,
    component: LinkComponent
  }

return newDecorator;
}  ;

export default linkifyCreateDecorator;