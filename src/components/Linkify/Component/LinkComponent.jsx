import style from './LinkComponent.module.scss'

const LinkComponent = (props) => {
  const { children } = props;
  const link = props.decoratedText;
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  if (!link) {
    console.error('LinkComponent: decoratedText is undefined or null');
    return null;
  }

  if (!children) {
    console.error('LinkComponent: children is undefined or null');
    return null;
  }

  return (
    <a 
    title={url}
    className={style.link} 
    href={url} 
    target="_blank"
    rel="noopener noreferrer" 
    >
      {children}
    </a>
  );
};


export default LinkComponent;