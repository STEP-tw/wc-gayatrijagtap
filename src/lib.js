const { UNICODE, NEW_LINE, EMPTY_STRING } = require('./constants');

const {
    splitByWhiteSpace,
    arrayAddition,
    generateArray
} = require('./util');

const { parseInput } = require('./parser');

const { getFormattedOutput } = require('./formatter');

const { missingFileError } = require('./errorHandler');

const countNewLines = (text) => text
    .split(NEW_LINE)
    .length - 1;

const countBytes = (text) => text
    .split(EMPTY_STRING)
    .length;

const countWords = (text) => splitByWhiteSpace(text)
    .filter(word => word != false)
    .length;

const count = {
    'line': countNewLines,
    'byte': countBytes,
    'word': countWords
}

const counter = (content, options) => options
    .map(option => count[option](content));

const generateSingleFileCount = function (options, fs, file) {
    if (!fs.existsSync(file)) {
        return { error: missingFileError(file) };
    }
    let fileContent = fs.readFileSync(file, UNICODE);
    let countArray = counter(fileContent, options);
    return { countArray, file };
}

const getCountWithFileNames = function (files, options, fs) {
    return files.map(generateSingleFileCount.bind(null, options, fs));
}

const getFormattedCount = function (files, options, fs) {
    let countWithFileNames = getCountWithFileNames(files, options, fs);
    if (files.length > 1) {
        let totalCount = getTotalCount(options.length, getValidCountArrays(countWithFileNames));
        countWithFileNames.push(totalCount);
    }
    return getFormattedOutput(countWithFileNames);
}

const getValidCountArrays = (countWithFileNames) => countWithFileNames
    .filter(countWithFileName => !countWithFileName.error);

const extractCountArray = (countWithFileNames) => countWithFileNames
    .map(countWithFileName => countWithFileName.countArray);

const getTotalCount = function (noOfOptions, countWithFileNames) {
    let countArray = extractCountArray(countWithFileNames);
    if (countArray.length < 1) {
        return getMissingFilesTotalCount(noOfOptions);
    }
    countArray = arrayAddition(countArray);
    return { countArray, file: 'total' };
}

const getMissingFilesTotalCount = function (noOfOptions) {
    return { countArray: generateArray(noOfOptions, 0), file: 'total' };
}

const wc = function (userArgs, fs) {
    let { options, files, optionError } = parseInput(userArgs);
    return optionError || getFormattedCount(files, options, fs).join('\n')
}

module.exports = { wc };