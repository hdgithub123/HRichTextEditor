const formatNumber = (number, maxFractionDigits = 2) => {
    if (number == null || number === "") {
      return '';
    }
    let localechange= navigator.language;
    const minFractionDigits = 0
    const options = {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
      style: 'decimal',
    };
    
    return new Intl.NumberFormat(localechange, options).format(number);
  };
  
  
const formatUsNumber = (number, maxFractionDigits=2) => {
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
  
const formatVnNumber = (number, maxFractionDigits=2) => {
    if (number == null || number === "") {
      return '';
    }
  
    const locale = 'vi-VN';
    const options = {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxFractionDigits,
      style: 'decimal',
    };
    
    return new Intl.NumberFormat(locale, options).format(number);
  };
  

  function roundNumber(number, numberround) {
    if (typeof number !== "number" || typeof numberround !== "number") return null;
    return Number(number.toFixed(numberround));
}

  export {
    formatNumber,
    formatUsNumber,
    formatVnNumber,
    roundNumber,
  }
  // note:
  // Value of option:
  // 1.decimal-- default { style: 'decimal' } example: 1234.56 → 1,234.56
  // 2. currency: { style: 'currency', currency: 'USD' } example: 1234.56 → $1,234.56 (với currency: 'USD')
  // 3. percent: { style: 'percent' } example:  0.123 → 12%
  // 4. unit: { style: 'unit', unit: 'kg' } example: 1234.56 → 1,234.56 kg