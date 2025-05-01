// function generateBackgroundImage({ url = 'none', size = 'cover', repeat = 'no-repeat' }) {
//     return `
//   .pagedjs_page {
//     background-image: url("${url}");
//     background-size: ${size};
//     background-repeat: ${repeat};
//     -webkit-print-color-adjust: exact;
//     print-color-adjust: exact;
//   }
//   `;
//   }
  
//   export default generateBackgroundImage;


function generateBackgroundImage(css = {
  backgroundImage: 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',

}) {
  const toKebabCase = (str) =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  // Chuyển đổi object CSS thành chuỗi CSS
  const cssString = Object.entries(css)
    .map(([key, value]) => `${toKebabCase(key)}: ${value};`)
    .join('\n');

  return `
  .pagedjs_page {
  position: relative;
  }
  .pagedjs_page::before {
  content: "";
    ${cssString}
    position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
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