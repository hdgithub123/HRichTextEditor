const formatNumber = (number, maxFractionDigits = 2) => {
  if (number == null || number === "") {
    return '';
  }
  let localechange = navigator.language;
  const minFractionDigits = 0
  const options = {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
    style: 'decimal',
  };

  return new Intl.NumberFormat(localechange, options).format(number);
};


const formatUsNumber = (number, maxFractionDigits = 2) => {
  if (number == null || number === "") {
    return '';
  }

  const locale = 'en-US';
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
    style: 'decimal',
  };

  return new Intl.NumberFormat(locale, options).format(number);
};

const formatVnNumber = (number, maxFractionDigits = 2) => {
  if (number == null || number === "") {
    return '';
  }
console.log("maxFractionDigits", maxFractionDigits);
  const locale = 'vi-VN';
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
    style: 'decimal',
  };

  return new Intl.NumberFormat(locale, options).format(number);
};



function roundNumber(number, numberround=2) {
  if (numberround >= 0) {
    return parseFloat(number.toFixed(numberround));
  } else {
    const factor = Math.pow(10, -numberround);
    return Math.round(number / factor) * factor;
  }
}



export {
  formatNumber,
  formatUsNumber,
  formatVnNumber,
  roundNumber,
}