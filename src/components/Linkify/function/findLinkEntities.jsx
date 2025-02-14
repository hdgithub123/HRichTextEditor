// // Hàm tìm kiếm các liên kết
// const findLinkEntities = (contentBlock, callback, contentState) => {
//   const text = contentBlock.getText();
//   const linkRegex = /https?:\/\/[^\s]+/g;
//   let matchArr, start;
//   while ((matchArr = linkRegex.exec(text)) !== null) {
//     start = matchArr.index;
//     callback(start, start + matchArr[0].length);
//   }
// };


const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    },
    callback
  );
};


export default findLinkEntities