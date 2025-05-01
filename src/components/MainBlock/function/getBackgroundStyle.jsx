const getBackgroundStyle = ({ editorState }) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
  
    // Lấy block có key 'mainBlock'
    const mainBlock = blockMap.get('mainBlock');
  
    if (mainBlock) {
      // Lấy blockStyle từ data của block
      let backgroundStyle = mainBlock.getData().get('backgroundCss');
      try{
        return  backgroundStyle = backgroundStyle.toJS();
      } catch {
        return backgroundStyle;  
      }   
      
    }
  
    return null;
  };
  
  export default getBackgroundStyle;