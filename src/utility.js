

// New .toFixed() function, removes trailing zeros
export const preciseDecimal = (num, decimals, min) => {
  let number = parseFloat(num);
  if (isNaN(number)) return num;
  if (!num.toString().trim()) {
    return num;
  }

  let string = number.toFixed(decimals);
  if (!string.length) return string;

  let minDecimals = parseInt(min) ?? 2;

  let digits = string.split('');
  let newDigits = string.split('');

  for (let i = digits.length - 1; i >= 0; i--) {
    if (i >= minDecimals && digits[i - minDecimals] == '.') {
      if (minDecimals == 0) newDigits.pop();
      break;
    }
    else if (digits[i] == '0') {
      newDigits.pop();
    }
    else if (digits[i] == '.') {
      newDigits.pop();
      break;
    }
    else {
      break;
    }
  }

  return newDigits.join('')
}
