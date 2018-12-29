const defaultOptions = ['c', 'w', 'l'];

const usageMessage = 'usage: wc [-clmw] [file ...]';

const missingFileError = function (file) {
  return 'wc: ' + file + ': open: No such file or directory';
}

const handleOptionError = function (extractedOptions) {
  let illegalOption = extractIllegalOptions(extractedOptions);
  return getOptionError(illegalOption);
}

const extractIllegalOptions = options => options
  .filter(option => !defaultOptions.includes(option));

const getOptionError = function (illegalOption) {
  let optionError = '';
  if (illegalOption.length > 0) {
    optionError = 'wc: illegal option -- ' + illegalOption[0] + '\n' + usageMessage;
  }
  return optionError;
}

module.exports = { handleOptionError, missingFileError };