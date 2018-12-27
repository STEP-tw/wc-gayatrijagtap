const handleErrors = function (extractedOptions) {
  let defaultOptions = ['c', 'w', 'l'];
  let illegalOption = extractedOptions.filter(option => !defaultOptions.includes(option));
  let optionError = '';
  if (illegalOption.length > 0) {
    optionError = 'wc: illegal option -- ' + illegalOption[0] + '\n' +
      'usage: wc [-clmw] [file ...]';
  }
  return optionError;
}

module.exports = { handleErrors };