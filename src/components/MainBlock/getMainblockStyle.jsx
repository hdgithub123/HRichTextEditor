const getMainblockStyle = ({ editorState }) => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
  
    // Lấy block có key 'mainBlock'
    const mainBlock = blockMap.get('mainBlock');
  
    if (mainBlock) {
      // Lấy blockStyle từ data của block
      let blockStyle = mainBlock.getData().get('blockStyle');
      try{
        return  blockStyle = blockStyle.toJS();
      } catch {
        return blockStyle;  
      }   
      
    }
  
    return null;
  };
  
  export default getMainblockStyle;