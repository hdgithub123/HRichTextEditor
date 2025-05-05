function generateBackgroundImage(css = {
  backgroundImage: 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'none',
}) {
  const toKebabCase = (str) =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  // Chuyển đổi object CSS thành chuỗi CSS
  const cssString = Object.entries(css)
    .map(([key, value]) => `${toKebabCase(key)}: ${value};`)
    .join('\n');

  return `
  .pagedjs_page {
   ${cssString}
  -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  `;
}

export default generateBackgroundImage;


function convertToCamelCase(cssObject) {
  const convertedObject = {};
  
  for (let key in cssObject) {
      const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      convertedObject[camelCaseKey] = cssObject[key];
  }

  return convertedObject;
}