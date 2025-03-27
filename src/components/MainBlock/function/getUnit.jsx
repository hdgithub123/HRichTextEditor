const getUnit = ({ editorState }) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
  
    // Lấy block có key 'mainBlock'
    const mainBlock = blockMap.get('mainBlock');
  
    if (mainBlock) {
      // Lấy blockStyle từ data của block
      let pageSetup = mainBlock.getData().get('unit');
      try{
        return  pageSetup = pageSetup.toJS();
      } catch {
        return pageSetup;  
      }   
      
    }
  
    return null;
  };
  
  export default getUnit;